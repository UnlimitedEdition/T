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

    const { width_mm, height_mm, material_id, model_type, has_led } = await req.json()

    // Get material and pricing data
    const { data: material, error: materialError } = await supabase
      .from('materials')
      .select('name, price_per_m2')
      .eq('id', material_id)
      .single()

    if (materialError) throw materialError

    const { data: pricing, error: pricingError } = await supabase
      .from('pricing_config')
      .select('*')
      .eq('material_id', material_id)
      .single()

    if (pricingError) throw pricingError

    // Calculate area and base price
    const area_m2 = (width_mm * height_mm) / 1_000_000
    let basePrice = area_m2 * material.price_per_m2

    // Apply model multipliers
    let modelMultiplier = 1
    if (model_type === 'double') {
      modelMultiplier = pricing.model_double_multiplier
      basePrice *= modelMultiplier
    } else if (model_type === '3d_letters') {
      const markup = pricing.model_3d_markup_percent / 100
      modelMultiplier = 1 + markup
      basePrice *= modelMultiplier
    }

    // Add LED cost
    let ledCost = 0
    if (has_led) {
      ledCost = pricing.led_fixed_price
      basePrice += ledCost
    }

    // Apply minimum order
    const finalPrice = Math.max(basePrice, pricing.minimum_order)
    
    // Round to nearest 10 RSD
    const roundedPrice = Math.round(finalPrice / 10) * 10

    const breakdown = {
      area_m2: parseFloat(area_m2.toFixed(4)),
      material_cost: parseFloat((area_m2 * material.price_per_m2).toFixed(2)),
      model_multiplier: modelMultiplier,
      led_cost: ledCost,
      subtotal: parseFloat(basePrice.toFixed(2)),
      minimum_applied: finalPrice > basePrice,
      final_price: roundedPrice
    }

    return new Response(
      JSON.stringify({ 
        price: roundedPrice,
        breakdown,
        material_name: material.name
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