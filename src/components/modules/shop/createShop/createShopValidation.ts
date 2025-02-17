import { z } from 'zod';

const socialMediaLinksSchema = z.object({
  facebook: z.string({ required_error: 'Facebook profile link is required' }),
  twitter: z.string({ required_error: 'Twitter profile link is required' }),
  instagram: z.string({ required_error: 'Instagram profile link is required' }),
});

export const createShopSchema = z.object({
  shopName: z.string({ required_error: 'Shop name is required' }),
  businessLicenseNumber: z.string({
    required_error: 'Business license number is required',
  }),
  address: z.string({ required_error: 'Address is required' }),
  contactNumber: z.string({ required_error: 'Contact number is required' }),
  website: z.string().url().nullable().optional(),
  servicesOffered: z.string({ required_error: 'Services offered is required' }),
  establishedYear: z.string({ required_error: 'Established year required' }),
  socialMediaLinks: socialMediaLinksSchema,
  taxIdentificationNumber: z.string({
    required_error: 'Tax identification number is required',
  }),
});
