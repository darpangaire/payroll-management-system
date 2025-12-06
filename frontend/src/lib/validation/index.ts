import * as z from 'zod';

export const SignUpValidation = z.object({
  name:z.string().min(2, {message:'Too Short'}),
  username: z.string().min(2, 'Username must be at least 2 characters').max(50, 'Username must be at most 50 characters'),

  email:z.string().min(8,{message:'Too Shirt'}),
  password:z.string().min(8,{message:"Password must be at least 8 character"}),

})

export const SignInValidation = z.object({
  email:z.string().min(8,{message:'Too Shirt'}),
  password:z.string().min(8,{message:"Password must be at least 8 character"}),

})



