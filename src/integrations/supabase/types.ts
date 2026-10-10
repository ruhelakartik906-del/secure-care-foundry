export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      admin_activity: {
        Row: {
          action: string
          created_at: string
          entity: string
          entity_id: string | null
          id: string
          label: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          entity: string
          entity_id?: string | null
          id?: string
          label?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          entity?: string
          entity_id?: string | null
          id?: string
          label?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          created_at: string
          id: string
          intro: string
          meta_description: string | null
          name: string
          noindex: boolean
          seo_title: string | null
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          intro?: string
          meta_description?: string | null
          name: string
          noindex?: boolean
          seo_title?: string | null
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          intro?: string
          meta_description?: string | null
          name?: string
          noindex?: boolean
          seo_title?: string | null
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      cms_blog_posts: {
        Row: {
          author: string
          canonical_url: string | null
          category: string
          content: Json
          content_html: string | null
          created_at: string
          excerpt: string
          faqs: Json
          featured_image_alt: string | null
          featured_image_caption: string | null
          featured_image_description: string | null
          featured_image_title: string | null
          featured_image_url: string | null
          focus_keyword: string | null
          focus_keywords: string[]
          id: string
          meta_description: string | null
          meta_title: string | null
          og_description: string | null
          og_image: string | null
          og_title: string | null
          published: boolean
          published_at: string | null
          related_product_slugs: string[]
          robots_follow: boolean
          robots_index: boolean
          schema_type: string
          slug: string
          status: string
          tags: string[]
          title: string
          twitter_description: string | null
          twitter_image: string | null
          twitter_title: string | null
          updated_at: string
        }
        Insert: {
          author?: string
          canonical_url?: string | null
          category?: string
          content?: Json
          content_html?: string | null
          created_at?: string
          excerpt?: string
          faqs?: Json
          featured_image_alt?: string | null
          featured_image_caption?: string | null
          featured_image_description?: string | null
          featured_image_title?: string | null
          featured_image_url?: string | null
          focus_keyword?: string | null
          focus_keywords?: string[]
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          published?: boolean
          published_at?: string | null
          related_product_slugs?: string[]
          robots_follow?: boolean
          robots_index?: boolean
          schema_type?: string
          slug: string
          status?: string
          tags?: string[]
          title: string
          twitter_description?: string | null
          twitter_image?: string | null
          twitter_title?: string | null
          updated_at?: string
        }
        Update: {
          author?: string
          canonical_url?: string | null
          category?: string
          content?: Json
          content_html?: string | null
          created_at?: string
          excerpt?: string
          faqs?: Json
          featured_image_alt?: string | null
          featured_image_caption?: string | null
          featured_image_description?: string | null
          featured_image_title?: string | null
          featured_image_url?: string | null
          focus_keyword?: string | null
          focus_keywords?: string[]
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          published?: boolean
          published_at?: string | null
          related_product_slugs?: string[]
          robots_follow?: boolean
          robots_index?: boolean
          schema_type?: string
          slug?: string
          status?: string
          tags?: string[]
          title?: string
          twitter_description?: string | null
          twitter_image?: string | null
          twitter_title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      cms_locations: {
        Row: {
          canonical_path: string | null
          city: string | null
          content: Json
          created_at: string
          faqs: Json
          focus_keywords: string[]
          id: string
          image_alt: string | null
          image_url: string | null
          internal_links: Json
          introduction: string
          meta_description: string | null
          noindex: boolean
          og_description: string | null
          og_image: string | null
          og_title: string | null
          product_slug: string
          published: boolean
          schema_type: string
          seo_title: string | null
          slug: string
          state: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          canonical_path?: string | null
          city?: string | null
          content?: Json
          created_at?: string
          faqs?: Json
          focus_keywords?: string[]
          id?: string
          image_alt?: string | null
          image_url?: string | null
          internal_links?: Json
          introduction?: string
          meta_description?: string | null
          noindex?: boolean
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          product_slug: string
          published?: boolean
          schema_type?: string
          seo_title?: string | null
          slug: string
          state: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          canonical_path?: string | null
          city?: string | null
          content?: Json
          created_at?: string
          faqs?: Json
          focus_keywords?: string[]
          id?: string
          image_alt?: string | null
          image_url?: string | null
          internal_links?: Json
          introduction?: string
          meta_description?: string | null
          noindex?: boolean
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          product_slug?: string
          published?: boolean
          schema_type?: string
          seo_title?: string | null
          slug?: string
          state?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      cms_pages: {
        Row: {
          content: Json
          slug: string
          updated_at: string
        }
        Insert: {
          content?: Json
          slug: string
          updated_at?: string
        }
        Update: {
          content?: Json
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      cms_products: {
        Row: {
          applications: Json
          benefits: Json
          canonical_url: string | null
          category: string
          created_at: string
          faqs: Json
          features: Json
          focus_keyword: string | null
          gallery: Json
          id: string
          image_alt: string | null
          image_url: string | null
          introduction: string
          meta_description: string | null
          name: string
          og_description: string | null
          og_image: string | null
          og_title: string | null
          parent_slug: string | null
          price_from: string | null
          price_to: string | null
          pricing_mode: string
          published: boolean
          robots_follow: boolean
          robots_index: boolean
          schema_data: Json
          schema_type: string
          secondary_keywords: string[]
          seo_title: string | null
          short_description: string
          short_name: string
          slug: string
          sort_order: number
          specifications: Json
          status: string
          updated_at: string
        }
        Insert: {
          applications?: Json
          benefits?: Json
          canonical_url?: string | null
          category: string
          created_at?: string
          faqs?: Json
          features?: Json
          focus_keyword?: string | null
          gallery?: Json
          id?: string
          image_alt?: string | null
          image_url?: string | null
          introduction?: string
          meta_description?: string | null
          name: string
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          parent_slug?: string | null
          price_from?: string | null
          price_to?: string | null
          pricing_mode?: string
          published?: boolean
          robots_follow?: boolean
          robots_index?: boolean
          schema_data?: Json
          schema_type?: string
          secondary_keywords?: string[]
          seo_title?: string | null
          short_description?: string
          short_name: string
          slug: string
          sort_order?: number
          specifications?: Json
          status?: string
          updated_at?: string
        }
        Update: {
          applications?: Json
          benefits?: Json
          canonical_url?: string | null
          category?: string
          created_at?: string
          faqs?: Json
          features?: Json
          focus_keyword?: string | null
          gallery?: Json
          id?: string
          image_alt?: string | null
          image_url?: string | null
          introduction?: string
          meta_description?: string | null
          name?: string
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          parent_slug?: string | null
          price_from?: string | null
          price_to?: string | null
          pricing_mode?: string
          published?: boolean
          robots_follow?: boolean
          robots_index?: boolean
          schema_data?: Json
          schema_type?: string
          secondary_keywords?: string[]
          seo_title?: string | null
          short_description?: string
          short_name?: string
          slug?: string
          sort_order?: number
          specifications?: Json
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      cms_site_settings: {
        Row: {
          bing_verification: string | null
          company_name: string
          default_meta_description: string | null
          default_og_image: string | null
          default_seo_title: string | null
          email: string
          favicon_url: string | null
          footer_description: string
          ga4_id: string | null
          google_maps_url: string | null
          gsc_verification: string | null
          gtm_id: string | null
          id: string
          latitude: number | null
          logo_url: string | null
          longitude: number | null
          meta_pixel_id: string | null
          office_address: string
          organization_logo: string | null
          phone: string
          secondary_phone: string
          social_links: Json
          updated_at: string
          website_url: string
          whatsapp: string
          working_hours: string
          works_address: string
        }
        Insert: {
          bing_verification?: string | null
          company_name?: string
          default_meta_description?: string | null
          default_og_image?: string | null
          default_seo_title?: string | null
          email: string
          favicon_url?: string | null
          footer_description: string
          ga4_id?: string | null
          google_maps_url?: string | null
          gsc_verification?: string | null
          gtm_id?: string | null
          id?: string
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          meta_pixel_id?: string | null
          office_address: string
          organization_logo?: string | null
          phone: string
          secondary_phone: string
          social_links?: Json
          updated_at?: string
          website_url?: string
          whatsapp: string
          working_hours: string
          works_address: string
        }
        Update: {
          bing_verification?: string | null
          company_name?: string
          default_meta_description?: string | null
          default_og_image?: string | null
          default_seo_title?: string | null
          email?: string
          favicon_url?: string | null
          footer_description?: string
          ga4_id?: string | null
          google_maps_url?: string | null
          gsc_verification?: string | null
          gtm_id?: string | null
          id?: string
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          meta_pixel_id?: string | null
          office_address?: string
          organization_logo?: string | null
          phone?: string
          secondary_phone?: string
          social_links?: Json
          updated_at?: string
          website_url?: string
          whatsapp?: string
          working_hours?: string
          works_address?: string
        }
        Relationships: []
      }
      cms_testimonials: {
        Row: {
          city: string | null
          client_name: string
          company: string | null
          created_at: string
          designation: string | null
          id: string
          photo_url: string | null
          published: boolean
          rating: number
          sort_order: number
          testimonial: string
          testimonial_date: string | null
          updated_at: string
        }
        Insert: {
          city?: string | null
          client_name: string
          company?: string | null
          created_at?: string
          designation?: string | null
          id?: string
          photo_url?: string | null
          published?: boolean
          rating?: number
          sort_order?: number
          testimonial: string
          testimonial_date?: string | null
          updated_at?: string
        }
        Update: {
          city?: string | null
          client_name?: string
          company?: string | null
          created_at?: string
          designation?: string | null
          id?: string
          photo_url?: string | null
          published?: boolean
          rating?: number
          sort_order?: number
          testimonial?: string
          testimonial_date?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      enquiries: {
        Row: {
          city: string | null
          company: string | null
          contact_method: string | null
          created_at: string
          email: string | null
          fbc: string | null
          fbclid: string | null
          fbp: string | null
          gbraid: string | null
          gclid: string | null
          id: string
          internal_notes: string | null
          landing_page: string | null
          message: string | null
          name: string
          page_url: string | null
          phone: string
          product: string | null
          project_type: string | null
          quantity: string | null
          referrer: string | null
          requirement: string | null
          source: string
          state: string | null
          status: Database["public"]["Enums"]["enquiry_status"]
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          wbraid: string | null
        }
        Insert: {
          city?: string | null
          company?: string | null
          contact_method?: string | null
          created_at?: string
          email?: string | null
          fbc?: string | null
          fbclid?: string | null
          fbp?: string | null
          gbraid?: string | null
          gclid?: string | null
          id?: string
          internal_notes?: string | null
          landing_page?: string | null
          message?: string | null
          name: string
          page_url?: string | null
          phone: string
          product?: string | null
          project_type?: string | null
          quantity?: string | null
          referrer?: string | null
          requirement?: string | null
          source?: string
          state?: string | null
          status?: Database["public"]["Enums"]["enquiry_status"]
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          wbraid?: string | null
        }
        Update: {
          city?: string | null
          company?: string | null
          contact_method?: string | null
          created_at?: string
          email?: string | null
          fbc?: string | null
          fbclid?: string | null
          fbp?: string | null
          gbraid?: string | null
          gclid?: string | null
          id?: string
          internal_notes?: string | null
          landing_page?: string | null
          message?: string | null
          name?: string
          page_url?: string | null
          phone?: string
          product?: string | null
          project_type?: string | null
          quantity?: string | null
          referrer?: string | null
          requirement?: string | null
          source?: string
          state?: string | null
          status?: Database["public"]["Enums"]["enquiry_status"]
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          wbraid?: string | null
        }
        Relationships: []
      }
      redirects: {
        Row: {
          auto_created: boolean
          created_at: string
          from_path: string
          id: string
          status_code: number
          to_path: string
          updated_at: string
        }
        Insert: {
          auto_created?: boolean
          created_at?: string
          from_path: string
          id?: string
          status_code?: number
          to_path: string
          updated_at?: string
        }
        Update: {
          auto_created?: boolean
          created_at?: string
          from_path?: string
          id?: string
          status_code?: number
          to_path?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_staff: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "user" | "content_manager"
      enquiry_status:
        | "new"
        | "contacted"
        | "qualified"
        | "proposal_sent"
        | "converted"
        | "closed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user", "content_manager"],
      enquiry_status: [
        "new",
        "contacted",
        "qualified",
        "proposal_sent",
        "converted",
        "closed",
      ],
    },
  },
} as const
