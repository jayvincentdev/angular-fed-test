export interface Property {
  id: number;
  bedrooms: number;
  summary: string;
  displayAddress: string;
  propertyType: string;
  price: number;
  branchName: string;
  propertyUrl: string;
  contactUrl: string;
  propertyTitle: string;
  mainImage: string;
}

export interface PropertyFilters {
  minPrice: string;
  maxPrice: string;
  minBeds: string;
  maxBeds: string;
  propertyTypes: string[];
}
