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
      cms_blog_posts: {
        Row: {
          author: string
          category: string
          content: Json
          created_at: string
          excerpt: string
          featured_image_url: string | null
          focus_keywords: string[]
          id: string
          meta_description: string | null
          meta_title: string | null
          og_description: string | null
          og_title: string | null
          published: boolean
          published_at: string | null
          related_product_slugs: string[]
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author?: string
          category?: string
          content?: Json
          created_at?: string
          excerpt?: string
          featured_image_url?: string | null
          focus_keywords?: string[]
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          og_description?: string | null
          og_title?: string | null
          published?: boolean
          published_at?: string | null
          related_product_slugs?: string[]
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          category?: string
          content?: Json
          created_at?: string
          excerpt?: string
          featured_image_url?: string | null
          focus_keywords?: string[]
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          og_description?: string | null
          og_title?: string | null
          published?: boolean
          published_at?: string | null
          related_product_slugs?: string[]
          slug?: string
          title?: string
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
          image_url: string | null
          introduction: string
          meta_description: string | null
          noindex: boolean
          og_description: string | null
          og_title: string | null
          product_slug: string
          published: boolean
          seo_title: string | null
          slug: string
          state: string
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
          image_url?: string | null
          introduction?: string
          meta_description?: string | null
          noindex?: boolean
          og_description?: string | null
          og_title?: string | null
          product_slug: string
          published?: boolean
          seo_title?: string | null
          slug: string
          state: string
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
          image_url?: string | null
          introduction?: string
          meta_description?: string | null
          noindex?: boolean
          og_description?: string | null
          og_title?: string | null
          product_slug?: string
          published?: boolean
          seo_title?: string | null
          slug?: string
          state?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      cms_products: {
        Row: {
          applications: Json
          benefits: Json
          category: string
          created_at: string
          faqs: Json
          features: Json
          focus_keyword: string | null
          gallery: Json
          id: string
          image_url: string | null
          introduction: string
          meta_description: string | null
          name: string
          og_description: string | null
          og_title: string | null
          parent_slug: string | null
          price_from: string | null
          price_to: string | null
          pricing_mode: string
          published: boolean
          schema_data: Json
          secondary_keywords: string[]
          seo_title: string | null
          short_description: string
          short_name: string
          slug: string
          sort_order: number
          specifications: Json
          updated_at: string
        }
        Insert: {
          applications?: Json
          benefits?: Json
          category: string
          created_at?: string
          faqs?: Json
          features?: Json
          focus_keyword?: string | null
          gallery?: Json
          id?: string
          image_url?: string | null
          introduction?: string
          meta_description?: string | null
          name: string
          og_description?: string | null
          og_title?: string | null
          parent_slug?: string | null
          price_from?: string | null
          price_to?: string | null
          pricing_mode?: string
          published?: boolean
          schema_data?: Json
          secondary_keywords?: string[]
          seo_title?: string | null
          short_description?: string
          short_name: string
          slug: string
          sort_order?: number
          specifications?: Json
          updated_at?: string
        }
        Update: {
          applications?: Json
          benefits?: Json
          category?: string
          created_at?: string
          faqs?: Json
          features?: Json
          focus_keyword?: string | null
          gallery?: Json
          id?: string
          image_url?: string | null
          introduction?: string
          meta_description?: string | null
          name?: string
          og_description?: string | null
          og_title?: string | null
          parent_slug?: string | null
          price_from?: string | null
          price_to?: string | null
          pricing_mode?: string
          published?: boolean
          schema_data?: Json
          secondary_keywords?: string[]
          seo_title?: string | null
          short_description?: string
          short_name?: string
          slug?: string
          sort_order?: number
          specifications?: Json
          updated_at?: string
        }
        Relationships: []
      }
      cms_site_settings: {
        Row: {
          email: string
          footer_description: string
          id: string
          logo_url: string | null
          office_address: string
          phone: string
          secondary_phone: string
          social_links: Json
          updated_at: string
          whatsapp: string
          working_hours: string
          works_address: string
        }
        Insert: {
          email: string
          footer_description: string
          id?: string
          logo_url?: string | null
          office_address: string
          phone: string
          secondary_phone: string
          social_links?: Json
          updated_at?: string
          whatsapp: string
          working_hours: string
          works_address: string
        }
        Update: {
          email?: string
          footer_description?: string
          id?: string
          logo_url?: string | null
          office_address?: string
          phone?: string
          secondary_phone?: string
          social_links?: Json
          updated_at?: string
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
          id: string
          message: string | null
          name: string
          page_url: string | null
          phone: string
          product: string | null
          quantity: string | null
          requirement: string | null
          source: string
          state: string | null
          status: Database["public"]["Enums"]["enquiry_status"]
        }
        Insert: {
          city?: string | null
          company?: string | null
          contact_method?: string | null
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          name: string
          page_url?: string | null
          phone: string
          product?: string | null
          quantity?: string | null
          requirement?: string | null
          source?: string
          state?: string | null
          status?: Database["public"]["Enums"]["enquiry_status"]
        }
        Update: {
          city?: string | null
          company?: string | null
          contact_method?: string | null
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          name?: string
          page_url?: string | null
          phone?: string
          product?: string | null
          quantity?: string | null
          requirement?: string | null
          source?: string
          state?: string | null
          status?: Database["public"]["Enums"]["enquiry_status"]
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
    }
    Enums: {
      app_role: "admin" | "user"
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
      app_role: ["admin", "user"],
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
