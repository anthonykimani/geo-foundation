export interface ContactInfo {
  name: string;
  phone: string;
  email?: string;
  country: string;
}

export const contacts: ContactInfo[] = [
  {
    name: "Sylvester Erude",
    phone: "+1 (309) 569 1606",
    email: "silvester@gladyserudeorganization.org",
    country: "USA",
  },
  {
    name: "Byron Erude",
    phone: "+254 718 069 393",
    email: "byron@gladyserudeorganization.org",
    country: "Kenya",
  },
];

export const generalEmail = "info@gladyserudeorganization.org";

export const mailingAddress = "gemrunkenya@gmail.com";