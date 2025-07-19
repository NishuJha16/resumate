import { supabase } from "./config";
export const createResume = async (
  resumeData: any,
  stepConfig: any,
  isCurrent = false,
  resumeName?: string
) => {
  const user = await supabase.auth.getUser();
  if (!user.data.user) throw new Error("User not authenticated");

  if (isCurrent) {
    // Set all other resumes to is_current = false
    await supabase
      .from("resumes")
      .update({ is_current: false })
      .eq("user_id", user.data.user.id);
  }

  const { data, error } = await supabase.from("resumes").insert([
    {
      user_id: user.data.user.id,
      data: resumeData,
      step_config: stepConfig,
      is_current: isCurrent,
      resume_name: resumeName ?? "resume_" + new Date().toISOString(),
    },
  ]);

  if (error) throw error;
  return data;
};

// GET RESUMES
// This function retrieves all resumes for the authenticated user.
// It returns an array of resumes sorted by creation date in descending order.
export const getResumes = async () => {
  const user = await supabase.auth.getUser();
  if (!user.data.user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("user_id", user.data.user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

// GET CURRENT RESUME
// This function retrieves the current resume for the authenticated user.
export const getCurrentResume = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_current", true)
    .maybeSingle();
  if (error) throw error;

  return data;
};

// UPDATE RESUME
// This function updates an existing resume with new data and step configuration.
export const updateResume = async (
  id: string,
  resumeData: any,
  stepConfig: any,
  isCurrent?: boolean,
  resumeName?: string
) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const userId = user.id;

  if (isCurrent) {
    const { error: rpcError } = await supabase.rpc("unset_current_resumes", {
      input_user_id: userId,
    });

    if (rpcError) {
      throw new Error(
        "Failed to unset other current resumes: " + rpcError.message
      );
    }
  }

  const updates: Record<string, any> = {
    data: resumeData,
    step_config: stepConfig,
    updated_at: new Date().toISOString(),
    resume_name: resumeName ?? "resume_" + new Date().toISOString(),
  };

  if (isCurrent !== undefined) {
    updates.is_current = isCurrent;
  }

  const { data, error } = await supabase
    .from("resumes")
    .update(updates)
    .eq("id", id)
    .eq("user_id", userId)
    .select();

  if (error) {
    throw new Error("Failed to update resume: " + error.message);
  }

  return data?.[0];
};

// DELETE RESUME
// This function deletes a resume by its ID.
// It throws an error if the deletion fails.
export const deleteResume = async (id: string) => {
  const { error } = await supabase.from("resumes").delete().eq("id", id);
  if (error) throw error;
};
