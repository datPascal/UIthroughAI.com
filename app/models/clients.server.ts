import type { User } from "./user.server";
import { supabase } from "./user.server";

export type client = {
  id: string;
  fullName: string;
  email: string;
  street_nr: string;
  plz: string;
  ort: string;
  bundesland: string;
  referenceId: string;
  profile_id: string;
};

export async function getClientList({ userId }: { userId: User["id"] }) {
  const { data } = await supabase
    .from("clients")
    .select("id, fullName, email, street_nr, plz, ort, bundesland, referenceId, profile_id")
    .eq("profile_id", userId);

  return data;
}

export async function createClient({
  fullName,
  email,
  street_nr,
  plz,
  ort,
  bundesland,
  referenceId,
  userId,
}: Pick<client, "fullName" | "email" | "street_nr" | "plz" | "ort" | "bundesland" | "referenceId"> & { userId: User["id"] }) {
  const { data, error } = await supabase
    .from("clients")
    .insert([{ fullName, email, street_nr, plz, ort, bundesland, referenceId, profile_id: userId }])
    .single();

  if (!error) {
    return data;
  }

  return null;
}

export async function updateClient({
  fullName,
  email,
  street_nr,
  plz,
  ort,
  bundesland,
  referenceId,
  userId,
  id
}: Pick<client, "fullName" | "email" | "street_nr" | "plz" | "ort" | "bundesland" | "referenceId" | "id"> & { userId: User["id"] }) {
  const { data, error } = await supabase
    .from("clients")
    .update([{ fullName, email, street_nr, plz, ort, bundesland, referenceId }])
    .match({ id, profile_id: userId });

  if (!error) {
    return data;
  }

  return null;
}

export async function deleteClient({
  id,
  userId,
}: Pick<client, "id"> & { userId: User["id"] }) {
  const { error } = await supabase
    .from("clients")
    .delete({ returning: "minimal" })
    .match({ id, profile_id: userId });

  if (!error) {
    return {};
  }

  return null;
}

export async function getClient({
  id,
  userId,
}: Pick<client, "id"> & { userId: User["id"] }) {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("profile_id", userId)
    .eq("id", id)
    .single();

  if (!error) {
    return {
      userId: data.profile_id,
      id: data.id,
      fullName: data.fullName,
      email: data.email,
      street_nr: data.street_nr,
      plz: data.plz,
      ort: data.ort,
      bundesland: data.bundesland,
      referenceId: data.referenceId,
    };
  }

  return null;
}