import * as z from "zod"

export const clientSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  type: z.enum(["pf", "cnpj"]),
  document: z.string().min(11, "Documento inválido"),
})

export type ClientFormValues = z.infer<typeof clientSchema>