import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const body = await req.json()
    
    // Validate required fields
    const requiredFields = ['customer_name', 'customer_email', 'width_mm', 'height_mm', 'material_id']
    for (const field of requiredFields) {
      if (!body[field]) {
        throw new Error(`Missing required field: ${field}`)
      }
    }

    // Calculate price
    const { data: material, error: materialError } = await supabase
      .from('materials')
      .select('price_per_m2')
      .eq('id', body.material_id)
      .single()

    if (materialError) throw materialError

    const { data: pricing, error: pricingError } = await supabase
      .from('pricing_config')
      .select('*')
      .eq('material_id', body.material_id)
      .single()

    if (pricingError) throw pricingError

    const area_m2 = (body.width_mm * body.height_mm) / 1_000_000
    let basePrice = area_m2 * material.price_per_m2

    // Apply model multipliers
    if (body.model_type === 'double') {
      basePrice *= pricing.model_double_multiplier
    } else if (body.model_type === '3d_letters') {
      basePrice *= (1 + pricing.model_3d_markup_percent / 100)
    }

    // Add LED cost
    if (body.has_led) {
      basePrice += pricing.led_fixed_price
    }

    // Apply minimum order
    const finalPrice = Math.max(basePrice, pricing.minimum_order)
    
    // Round to nearest 10 RSD
    const roundedPrice = Math.round(finalPrice / 10) * 10

    // Insert inquiry
    const { data, error } = await supabase
      .from('inquiries')
      .insert({
        ...body,
        calculated_price: roundedPrice
      })
      .select()
      .single()

    if (error) throw error

    // Send notification email (you can add email service here)
    console.log('New inquiry received:', data)

    return new Response(
      JSON.stringify({ 
        success: true, 
        inquiry_id: data.id,
        calculated_price: roundedPrice
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: error.message 
      }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})