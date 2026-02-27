import { supabase } from "./supabase";

// ==================== CLASSES ====================

export async function getClasses() {
  const { data, error } = await supabase
    .from("classes")
    .select("*")
    .order("name");
  if (error) { console.error("Error fetching classes:", error); return []; }
  return data;
}

export async function getClassBySlug(slug: string) {
  const { data, error } = await supabase
    .from("classes")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data;
}

// ==================== ALUMNI ====================

export async function getAlumniByClass(classId: string) {
  const { data, error } = await supabase
    .from("alumni")
    .select("*")
    .eq("class_id", classId)
    .order("full_name");
  if (error) { console.error("Error fetching alumni:", error); return []; }
  return data;
}

// ==================== GALLERY ====================

export async function getGalleryImages(classId?: string) {
  let query = supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false });

  if (classId) query = query.eq("class_id", classId);

  const { data, error } = await query;
  if (error) { console.error("Error fetching gallery:", error); return []; }
  return data;
}

// ==================== GUESTBOOK ====================

export async function getApprovedGuestbookEntries() {
  const { data, error } = await supabase
    .from("guestbook")
    .select("*")
    .eq("is_approved", true)
    .order("created_at", { ascending: false });
  if (error) { console.error("Error fetching guestbook:", error); return []; }
  return data;
}

export async function submitGuestbookEntry(entry: {
  author_name: string;
  class_name?: string;
  message: string;
}) {
  const { error } = await supabase.from("guestbook").insert(entry);
  if (error) { console.error("Error submitting guestbook:", error); return false; }
  return true;
}

// ==================== EVENT SCHEDULE ====================

export async function getEventSchedule() {
  const { data, error } = await supabase
    .from("event_schedule")
    .select("*")
    .order("sort_order");
  if (error) { console.error("Error fetching schedule:", error); return []; }
  return data;
}

// ==================== NEWS (reuse CMS posts) ====================

export async function getReunionPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });
  if (error) { console.error("Error fetching posts:", error); return []; }
  return data;
}
