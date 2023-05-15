import type { User } from "./user.server";
import { supabase } from "./user.server";

export type Query = {
  id: string;
  prompt: string;
  answer: string;
  profile_id: string;
};

export async function getQueryListItems({ userId }: { userId: User["id"] }) {
  const { data } = await supabase
    .from("queries")
    .select("id, prompt, answer")
    .eq("profile_id", userId);

  return data;
}

export async function createQuery({
  prompt,
  answer,
  id,
  userId,
}: Pick<Query, "answer" | "prompt" | "id"> & { userId: User["id"] }) {
  const { data, error } = await supabase
    .from("queries")
    .insert([{ prompt, answer, id, profile_id: userId }])
    .single();

  if (!error) {
    return data;
  }

  return null;
}

export async function deleteQuery({
  id,
  userId,
}: Pick<Query, "id"> & { userId: User["id"] }) {
  const { error } = await supabase
    .from("queries")
    .delete({ returning: "minimal" })
    .match({ id, profile_id: userId });

  if (!error) {
    return {};
  }

  return null;
}

export async function getQuery({
  id,
  userId,
}: Pick<Query, "id"> & { userId: User["id"] }) {
  const { data, error } = await supabase
    .from("queries")
    .select("*")
    .eq("profile_id", userId)
    .eq("id", id)
    .single();

  if (!error) {
    return {
      userId: data.profile_id,
      id: data.id,
      prompt: data.prompt,
      answer: data.answer
    };
  }

  return null;
}
