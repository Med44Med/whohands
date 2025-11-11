async function createStoreAction(formData: FormData) {

  const supabase = await createClient();
  const name = formData.get("name");

  const {
    data: {
      user: { id },
    },
  } = await supabase.auth.getUser();
  const posting = await supabase
    .from("stores")
    .insert([{ title: name, owner: id }]);

  revalidatePath("/");
  redirect("/store");
}

export default createStoreAction