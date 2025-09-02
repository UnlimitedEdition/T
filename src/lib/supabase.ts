import { createClient } from '@supabase/supabase-js'

// 🔧 Ispravite URL – uklonite razmake!
const supabaseUrl = 'https://qjxljjgmolsbfpjeigbu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqeGxqamdtb2xzYmZwamVpZ2J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1OTQwMzYsImV4cCI6MjA3MjE3MDAzNn0.opIMwlR_46fqFWGnNJjiq7_Y8ZhbRJIPXdPq2Jhs4UM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export interface HomepageSettings {
  id: number;
  hero_title: string;
  hero_subtitle: string;
  hero_badges: string[];
  cta_primary_text: string;
  cta_secondary_text: string;
  stat_delivery_time: string;
  stat_satisfaction_percent: number;
  updated_at: string;
}

export interface SiteStats {
  completed_projects: number;
  avg_rating: number;
  review_count: number;
}

export interface Material {
  id: number
  name: string
  description: string
  thickness_options: number[]
  indoor_outdoor: string
  maintenance_info: string
  price_per_m2: number
  image_url: string
  created_at: string
  updated_at: string
}

export interface Work {
  id: number
  title: string
  description: string
  material_id: number
  dimensions: string
  has_led: boolean
  tags: string[]
  images: string[]
  featured: boolean
  created_at: string
  updated_at: string
  materials?: Material
}

export interface Review {
  id: number
  customer_name: string
  rating: number
  comment: string
  photo_url: string | null
  verified: boolean
  created_at: string
  updated_at: string
}

export interface PricingConfig {
  id: number
  material_id: number
  base_price_m2: number
  model_double_multiplier: number
  model_3d_markup_percent: number
  led_fixed_price: number
  minimum_order: number
  updated_at: string
}

export interface Inquiry {
  id?: number
  customer_name: string
  customer_email: string
  customer_phone?: string
  material_id: number
  width_mm: number
  height_mm: number
  model_type: 'single' | 'double' | '3d_letters'
  has_led: boolean
  led_type?: '5V' | '220V'
  calculated_price?: number
  message?: string
  attachment_url?: string
  status?: string
  sent_review_request?: string | null
  created_at?: string
  updated_at?: string
}

export interface FAQ {
  id: number
  question: string
  answer: string
  category: string
  order_position: number
  created_at: string
  updated_at: string
}

export interface NewsletterSubscriber {
  id: string
  email: string
  subscribed_at: string
  active: boolean
}


// === API FUNCTIONS ===
export const getHomepageSettings = async (): Promise<HomepageSettings | null> => {
  const { data, error } = await supabase
    .from('homepage_settings')
    .select('*')
    .eq('id', 1)
    .single();

  if (error) {
    console.error('Failed to fetch homepage settings:', error);
    return null;
  }

  return data;
};

export const getSiteStats = async (): Promise<SiteStats | null> => {
  // Broj projekata
  const { count: projectCount, error: projectError } = await supabase
    .from('works')
    .select('*', { count: 'exact', head: true });

  if (projectError) {
    console.error('Failed to fetch project count:', projectError);
    return null;
  }

  // Prosečna ocena i broj recenzija
  const { data: reviewData, error: reviewError } = await supabase
    .from('reviews')
    .select('rating', { count: 'exact' })
    .eq('verified', true);

  if (reviewError) {
    console.error('Failed to fetch reviews:', reviewError);
    return null;
  }

  const reviewCount = reviewData.length;
  const avgRating = reviewCount > 0
    ? Math.round(reviewData.reduce((sum, r) => sum + r.rating, 0) / reviewCount * 10) / 10
    : 0;

  return {
    completed_projects: projectCount || 0,
    avg_rating: avgRating,
    review_count: reviewCount,
  };
};

// --- Materijali ---
export const getMaterials = async (): Promise<Material[]> => {
  const { data, error } = await supabase
    .from('materials')
    .select('*')
    .order('name')

  if (error) throw error
  return data || []
}

export const createMaterial = async (material: Omit<Material, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('materials')
    .insert([material])

  if (error) throw error
  return data
}

export const updateMaterial = async (id: number, material: Partial<Material>) => {
  const { data, error } = await supabase
    .from('materials')
    .update(material)
    .eq('id', id)

  if (error) throw error
  return data
}

export const deleteMaterial = async (id: number) => {
  const { data, error } = await supabase
    .from('materials')
    .delete()
    .eq('id', id)

  if (error) throw error
  return data
}

// --- Galerija radova ---
export const getWorks = async (limit?: number): Promise<Work[]> => {
  let query = supabase
    .from('works')
    .select(`
      *,
      materials (
        id,
        name
      )
    `)
    .order('created_at', { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) throw error
  return data || []
}

export const createWork = async (work: Omit<Work, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('works')
    .insert([work])

  if (error) throw error
  return data
}

export const updateWork = async (id: number, work: Partial<Work>) => {
  const { data, error } = await supabase
    .from('works')
    .update(work)
    .eq('id', id)

  if (error) throw error
  return data
}

export const deleteWork = async (id: number) => {
  const { data, error } = await supabase
    .from('works')
    .delete()
    .eq('id', id)

  if (error) throw error
  return data
}

// --- Recenzije ---
export const getReviews = async (limit?: number): Promise<Review[]> => {
  let query = supabase
    .from('reviews')
    .select('*')
    .eq('verified', true)
    .order('created_at', { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) throw error
  return data || []
}

export const getAdminReviews = async (): Promise<Review[]> => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export const updateReview = async (id: number, review: Partial<Review>) => {
  const { data, error } = await supabase
    .from('reviews')
    .update(review)
    .eq('id', id)

  if (error) throw error
  return data
}

export const deleteReview = async (id: number) => {
  const { data, error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', id)

  if (error) throw error
  return data
}

// --- FAQ ---
export const getFAQs = async (): Promise<FAQ[]> => {
  const { data, error } = await supabase
    .from('faq')
    .select('*')
    .order('order_position')

  if (error) throw error
  return data || []
}

export const getAdminFAQs = async (): Promise<FAQ[]> => {
  const { data, error } = await supabase
    .from('faq')
    .select('*')
    .order('order_position')

  if (error) throw error
  return data || []
}

export const createFAQ = async (faq: Omit<FAQ, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('faq')
    .insert([faq])

  if (error) throw error
  return data
}

export const updateFAQ = async (id: number, faq: Partial<FAQ>) => {
  const { data, error } = await supabase
    .from('faq')
    .update(faq)
    .eq('id', id)

  if (error) throw error
  return data
}

export const deleteFAQ = async (id: number) => {
  const { data, error } = await supabase
    .from('faq')
    .delete()
    .eq('id', id)

  if (error) throw error
  return data
}

// --- Upiti ---
export const getInquiries = async (): Promise<Inquiry[]> => {
  const { data, error } = await supabase
    .from('inquiries')
    .select(`
      id,
      customer_name,
      customer_email,
      customer_phone,
      material_id,
      width_mm,
      height_mm,
      model_type,
      has_led,
      led_type,
      calculated_price,
      message,
      status,
      created_at,
      materials (
        name
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const updateInquiryStatus = async (id: number, status: string) => {
  const { data, error } = await supabase
    .from('inquiries')
    .update({ 
      status, 
      updated_at: new Date().toISOString() 
    })
    .eq('id', id)

  if (error) throw error
  return data
}

// --- Cenovna konfiguracija ---
export const getPricingConfig = async (): Promise<PricingConfig[]> => {
  const { data, error } = await supabase
    .from('pricing_config')
    .select('*')
    .order('material_id');

  if (error) throw error;
  return data || [];
};

export const updatePricingConfig = async (id: number, config: Partial<PricingConfig>) => {
  const { data, error } = await supabase
    .from('pricing_config')
    .update(config)
    .eq('id', id);

  if (error) throw error;
  return data;
};

// --- Kalkulator cene ---
export const calculatePrice = async (params: {
  width_mm: number
  height_mm: number
  material_id: number
  model_type: string
  has_led: boolean
}) => {
  const { data: material, error: mError } = await supabase
    .from('materials')
    .select('*')
    .eq('id', params.material_id)
    .single()

  if (mError || !material) {
    throw new Error('Materijal nije pronađen')
  }

  const { data: pricing, error: pError } = await supabase
    .from('pricing_config')
    .select('*')
    .eq('material_id', params.material_id)
    .single()

  if (pError || !pricing) {
    throw new Error('Cenovna konfiguracija nije pronađena')
  }

  const area_m2 = (params.width_mm * params.height_mm) / 1_000_000
  let base_price = area_m2 * pricing.base_price_m2

  if (params.model_type === 'double') {
    base_price *= pricing.model_double_multiplier
  } else if (params.model_type === '3d_letters') {
    base_price *= (1 + pricing.model_3d_markup_percent / 100)
  }

  const led_price = params.has_led ? pricing.led_fixed_price : 0
  let final_price = base_price + led_price

  if (final_price < pricing.minimum_order) {
    final_price = pricing.minimum_order
  }

  final_price = Math.ceil(final_price / 100) * 100

  return { price: Math.round(final_price) }
}

// --- Slanje upita ---
export const submitInquiry = async (inquiry: Inquiry) => {
  const { data, error } = await supabase
    .from('inquiries')
    .insert([inquiry])

  if (error) throw error
  return data
}

export const subscribeToNewsletter = async (email: string) => {
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .insert([{ email }])

  if (error && error.code !== '23505') { // 23505 = unique_violation
    throw error
  }

  return data
}
