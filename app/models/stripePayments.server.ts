import type { User } from "./user.server";
import { supabase } from "./user.server";

export type stripePayments = {
  id: string;
  date: Date;
  pdf: string;
  amount: string;
  status: string;
  subscribtionId: string;
  userId: string;
};

export async function createStripePayment({
  id,
  date,
  pdf,
  amount,
  status,
  subscribtionId, 
  userId,
}: Pick<stripePayments, "id" | "date" | "pdf" | "amount" | "status" | "subscribtionId"> & { userId: User["id"] }) {
  const { data, error } = await supabase
    .from("stripePayments")
    .insert([{ id, date, pdf, amount, status, subscribtionId, profile_id: userId }])
    .single();

  if (!error) {
    return data;
  }

  return null;
}

export async function getStripePayment({
  id,
  userId,
}: Pick<stripePayments, "id"> & { userId: User["id"] }) {
  const { data, error } = await supabase
    .from("stripePayments")
    .select("*")
    .eq("profile_id", userId)
    .eq("id", id)
    .single();

  if (!error) {
    return {
      id: data.id,
      date: data.date,
      pdf: data.pdf,
      amount: data.amount,
      status: data.status,
      subscribtionId: data.subscribtionId,
      userId: data.profile_id,
    };
  }

  return null;
}
