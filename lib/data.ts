export type Product = {
  id: string
  title: string
  slug: string
  image: string
  price: number
  discountPrice?: number
  rating: number
  reviews: number
  description: string
  longDescription?: string
  category: string
  categoryId: string
  features?: string[]
  specifications?: Record<string, string>
  relatedProducts?: string[]
  isFeatured?: boolean
  isNewArrival?: boolean
  isBestSeller?: boolean
}

export type Category = {
  id: string
  name: string
  slug: string
  description: string
  image?: string
  productCount: number
}

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Legal Templates",
    slug: "legal-templates",
    description: "Professional legal document templates for various business and personal needs",
    image: "/placeholder.svg?height=300&width=300",
    productCount: 24,
  },
  {
    id: "cat-2",
    name: "Business Documents",
    slug: "business-documents",
    description: "Essential documents for starting and running a business",
    image: "/placeholder.svg?height=300&width=300",
    productCount: 18,
  },
  {
    id: "cat-3",
    name: "Personal Legal Documents",
    slug: "personal-legal-documents",
    description: "Legal documents for personal and family matters",
    image: "/placeholder.svg?height=300&width=300",
    productCount: 15,
  },
  {
    id: "cat-4",
    name: "Legal Guides",
    slug: "legal-guides",
    description: "Comprehensive guides on various legal topics",
    image: "/placeholder.svg?height=300&width=300",
    productCount: 12,
  },
  {
    id: "cat-5",
    name: "Contract Templates",
    slug: "contract-templates",
    description: "Professional contract templates for various business relationships",
    image: "/placeholder.svg?height=300&width=300",
    productCount: 20,
  },
]

export const products: Product[] = [
  {
    id: "1",
    title: "Starting the Professional Engagement",
    slug: "starting-professional-engagement",
    image: "/placeholder.svg?height=500&width=500",
    price: 95,
    discountPrice: 85,
    rating: 4.8,
    reviews: 176,
    description: "A comprehensive template for initiating professional relationships and engagements.",
    longDescription:
      "This comprehensive legal document provides a framework for initiating professional relationships and engagements. It covers all essential aspects of beginning a professional relationship, including scope of work, responsibilities, timelines, and compensation. The template has been drafted by experienced legal professionals and is regularly updated to comply with current laws and regulations.",
    category: "Legal Templates",
    categoryId: "cat-1",
    features: [
      "Fully customizable template",
      "Professionally drafted by legal experts",
      "Compatible with both individual and corporate use",
      "Regular updates to comply with changing regulations",
      "Includes guidance notes for easy completion",
    ],
    specifications: {
      Format: "PDF & Word Document",
      Pages: "24",
      "Last Updated": "January 2023",
      Language: "English",
      "Compatible With": "US, UK, Canada, Australia Legal Systems",
    },
    relatedProducts: ["2", "3", "4"],
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: "2",
    title: "Facilitating the Collaborative Relationship",
    slug: "facilitating-collaborative-relationship",
    image: "/placeholder.svg?height=500&width=500",
    price: 75,
    discountPrice: 65,
    rating: 4.6,
    reviews: 93,
    description: "A template designed to establish clear parameters for collaborative professional relationships.",
    longDescription:
      "This document template is designed to establish clear parameters for collaborative professional relationships. It addresses common challenges in partnerships and collaborations, providing a structured approach to joint ventures, shared responsibilities, and mutual objectives.",
    category: "Legal Templates",
    categoryId: "cat-1",
    features: [
      "Templates for various collaboration models",
      "Guidance on profit sharing and resource allocation",
      "Conflict resolution procedures",
      "Intellectual property protection clauses",
      "Exit strategy templates",
    ],
    specifications: {
      Format: "PDF & Word Document",
      Pages: "18",
      "Last Updated": "March 2023",
      Language: "English",
      "Compatible With": "US, UK, Canada, Australia Legal Systems",
    },
    relatedProducts: ["1", "3", "5"],
    isNewArrival: true,
  },
  {
    id: "3",
    title: "Terminating the Professional Engagement",
    slug: "terminating-professional-engagement",
    image: "/placeholder.svg?height=500&width=500",
    price: 120,
    discountPrice: 110,
    rating: 4.9,
    reviews: 128,
    description: "A comprehensive guide and template for properly concluding professional relationships.",
    longDescription:
      "A comprehensive guide and template for properly concluding professional relationships. This document ensures that all parties have clarity on the termination process, remaining obligations, final deliverables, and post-engagement restrictions or requirements.",
    category: "Legal Templates",
    categoryId: "cat-1",
    features: [
      "Clean termination process templates",
      "Final payment schedule frameworks",
      "Post-termination confidentiality agreements",
      "Data handling and transfer procedures",
      "Non-compete and non-solicitation clauses",
    ],
    specifications: {
      Format: "PDF & Word Document",
      Pages: "22",
      "Last Updated": "April 2023",
      Language: "English",
      "Compatible With": "US, UK, Canada, Australia Legal Systems",
    },
    relatedProducts: ["1", "2", "6"],
    isBestSeller: true,
  },
  {
    id: "4",
    title: "Securing Organizational Objectives",
    slug: "securing-organizational-objectives",
    image: "/placeholder.svg?height=500&width=500",
    price: 165,
    discountPrice: 145,
    rating: 4.7,
    reviews: 156,
    description: "A strategic legal framework to help organizations establish and protect their core objectives.",
    longDescription:
      "This strategic legal framework helps organizations establish and protect their core objectives. The document includes templates for mission statements, vision documents, and operational guidelines that align with legal requirements while furthering organizational goals.",
    category: "Business Documents",
    categoryId: "cat-2",
    features: [
      "Strategic planning documentation",
      "Legal compliance frameworks",
      "Stakeholder agreement templates",
      "Board resolution formats",
      "Accountability and reporting structures",
    ],
    specifications: {
      Format: "PDF & Word Document",
      Pages: "28",
      "Last Updated": "February 2023",
      Language: "English",
      "Compatible With": "US, UK, Canada, Australia Legal Systems",
    },
    relatedProducts: ["1", "5", "6"],
    isFeatured: true,
  },
  {
    id: "5",
    title: "Commercial Transactions Objective",
    slug: "commercial-transactions-objective",
    image: "/placeholder.svg?height=500&width=500",
    price: 118,
    discountPrice: 105,
    rating: 4.8,
    reviews: 201,
    description: "A comprehensive template for structuring and documenting commercial transactions.",
    longDescription:
      "A comprehensive template for structuring and documenting commercial transactions. This document provides a reliable framework for purchases, sales, trades, and other business exchanges with appropriate legal protections for all parties involved.",
    category: "Business Documents",
    categoryId: "cat-2",
    features: [
      "Multiple transaction type templates",
      "Payment terms and conditions frameworks",
      "Delivery and acceptance protocols",
      "Warranty and liability clauses",
      "Dispute resolution procedures",
    ],
    specifications: {
      Format: "PDF & Word Document",
      Pages: "26",
      "Last Updated": "May 2023",
      Language: "English",
      "Compatible With": "US, UK, Canada, Australia Legal Systems",
    },
    relatedProducts: ["2", "4", "6"],
    isNewArrival: true,
    isBestSeller: true,
  },
  {
    id: "6",
    title: "Admissibility of evidence in civil proceedings",
    slug: "admissibility-evidence-civil-proceedings",
    image: "/placeholder.svg?height=500&width=500",
    price: 135,
    discountPrice: 125,
    rating: 4.9,
    reviews: 184,
    description:
      "A comprehensive guide explaining the rules and precedents regarding evidence admissibility in civil legal proceedings.",
    longDescription:
      "This comprehensive guide explains the rules and precedents regarding evidence admissibility in civil legal proceedings. It provides practitioners with a clear understanding of how different types of evidence are treated in court and strategies for effectively presenting or challenging evidence.",
    category: "Legal Guides",
    categoryId: "cat-4",
    features: [
      "Complete analysis of evidence types and their admissibility",
      "Case law references and precedents",
      "Procedures for submitting and challenging evidence",
      "Expert testimony guidelines",
      "Digital and electronic evidence considerations",
    ],
    specifications: {
      Format: "PDF & Word Document",
      Pages: "32",
      "Last Updated": "June 2023",
      Language: "English",
      "Compatible With": "US, UK, Canada, Australia Legal Systems",
    },
    relatedProducts: ["3", "4", "5"],
    isFeatured: true,
  },
  {
    id: "7",
    title: "Innovation Financing Action",
    slug: "innovation-financing-action",
    image: "/placeholder.svg?height=500&width=500",
    price: 85,
    discountPrice: 75,
    rating: 4.7,
    reviews: 112,
    description: "Legal templates for securing funding and investment for innovative projects and startups.",
    longDescription:
      "This comprehensive package includes all the legal documents needed for securing funding and investment for innovative projects and startups. From term sheets to investment agreements, these templates provide a solid legal foundation for your financing activities.",
    category: "Business Documents",
    categoryId: "cat-2",
    features: [
      "Term sheet templates",
      "Investment agreement frameworks",
      "Shareholder agreement templates",
      "Intellectual property protection clauses",
      "Investor rights documentation",
    ],
    specifications: {
      Format: "PDF & Word Document",
      Pages: "45",
      "Last Updated": "July 2023",
      Language: "English",
      "Compatible With": "US, UK, Canada, Australia Legal Systems",
    },
    relatedProducts: ["4", "5", "8"],
    isNewArrival: true,
  },
  {
    id: "8",
    title: "Non-Governmental Organization (NGO) Formation",
    slug: "ngo-formation",
    image: "/placeholder.svg?height=500&width=500",
    price: 128,
    discountPrice: 115,
    rating: 4.8,
    reviews: 89,
    description: "Complete legal package for establishing and operating a non-governmental organization.",
    longDescription:
      "This comprehensive legal package provides all the necessary documents for establishing and operating a non-governmental organization. From incorporation documents to governance frameworks, this package ensures your NGO has a solid legal foundation.",
    category: "Business Documents",
    categoryId: "cat-2",
    features: [
      "Incorporation documents",
      "Governance framework templates",
      "Bylaws and constitution templates",
      "Donor agreement templates",
      "Compliance checklists",
    ],
    specifications: {
      Format: "PDF & Word Document",
      Pages: "56",
      "Last Updated": "August 2023",
      Language: "English",
      "Compatible With": "US, UK, Canada, Australia Legal Systems",
    },
    relatedProducts: ["7", "9", "12"],
    isFeatured: true,
  },
  {
    id: "9",
    title: "Corporate Restructuring Package",
    slug: "corporate-restructuring-package",
    image: "/placeholder.svg?height=500&width=500",
    price: 167,
    discountPrice: 150,
    rating: 4.9,
    reviews: 76,
    description: "Comprehensive legal templates for corporate restructuring and reorganization.",
    longDescription:
      "This package provides comprehensive legal templates for corporate restructuring and reorganization. Whether you're merging departments, spinning off divisions, or completely reorganizing your corporate structure, these templates provide the legal framework you need.",
    category: "Business Documents",
    categoryId: "cat-2",
    features: [
      "Merger and acquisition templates",
      "Asset transfer agreements",
      "Employee transition documents",
      "Shareholder notification templates",
      "Regulatory compliance checklists",
    ],
    specifications: {
      Format: "PDF & Word Document",
      Pages: "78",
      "Last Updated": "September 2023",
      Language: "English",
      "Compatible With": "US, UK, Canada, Australia Legal Systems",
    },
    relatedProducts: ["4", "8", "10"],
    isBestSeller: true,
  },
  {
    id: "10",
    title: "Requests for Relief & In-Chambers Hearings",
    slug: "requests-relief-chambers-hearings",
    image: "/placeholder.svg?height=500&width=500",
    price: 142,
    discountPrice: 130,
    rating: 4.7,
    reviews: 63,
    description: "Legal templates and guides for filing requests for relief and preparing for in-chambers hearings.",
    longDescription:
      "This package includes legal templates and comprehensive guides for filing requests for relief and preparing for in-chambers hearings. These documents help legal professionals navigate these specific court procedures effectively.",
    category: "Legal Guides",
    categoryId: "cat-4",
    features: [
      "Request for relief templates",
      "In-chambers hearing preparation guides",
      "Procedural checklists",
      "Sample arguments and precedents",
      "Post-hearing follow-up templates",
    ],
    specifications: {
      Format: "PDF & Word Document",
      Pages: "42",
      "Last Updated": "October 2023",
      Language: "English",
      "Compatible With": "US, UK, Canada, Australia Legal Systems",
    },
    relatedProducts: ["6", "9", "11"],
    isNewArrival: true,
  },
  {
    id: "11",
    title: "Community Benefit Organization Formation",
    slug: "community-benefit-organization-formation",
    image: "/placeholder.svg?height=500&width=500",
    price: 148,
    discountPrice: 135,
    rating: 4.8,
    reviews: 54,
    description: "Legal templates for establishing and operating community benefit organizations.",
    longDescription:
      "This package provides all the necessary legal templates for establishing and operating community benefit organizations. From incorporation documents to governance frameworks, these templates ensure your organization has a solid legal foundation.",
    category: "Business Documents",
    categoryId: "cat-2",
    features: [
      "Incorporation documents",
      "Governance framework templates",
      "Bylaws and constitution templates",
      "Community engagement policies",
      "Compliance checklists",
    ],
    specifications: {
      Format: "PDF & Word Document",
      Pages: "52",
      "Last Updated": "November 2023",
      Language: "English",
      "Compatible With": "US, UK, Canada, Australia Legal Systems",
    },
    relatedProducts: ["8", "10", "12"],
    isFeatured: true,
  },
  {
    id: "12",
    title: "Non-Disclosure Agreement Package",
    slug: "non-disclosure-agreement-package",
    image: "/placeholder.svg?height=500&width=500",
    price: 96,
    discountPrice: 85,
    rating: 4.9,
    reviews: 215,
    description: "Comprehensive package of non-disclosure agreement templates for various business situations.",
    longDescription:
      "This comprehensive package includes various non-disclosure agreement templates tailored for different business situations. From employee NDAs to business partnership confidentiality agreements, this package covers all your confidentiality needs.",
    category: "Contract Templates",
    categoryId: "cat-5",
    features: [
      "Employee NDA templates",
      "Business partnership confidentiality agreements",
      "Vendor and contractor NDAs",
      "Mutual and one-way NDA options",
      "Industry-specific NDA variations",
    ],
    specifications: {
      Format: "PDF & Word Document",
      Pages: "35",
      "Last Updated": "December 2023",
      Language: "English",
      "Compatible With": "US, UK, Canada, Australia Legal Systems",
    },
    relatedProducts: ["1", "2", "11"],
    isBestSeller: true,
  },
]

// Helper function to get product by ID
export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

// Helper function to get related products
export function getRelatedProducts(productIds: string[]): Product[] {
  return products.filter((product) => productIds.includes(product.id))
}

// Helper function to get products by category
export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((product) => product.categoryId === categoryId)
}

// Helper function to get featured products
export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.isFeatured)
}

// Helper function to get best seller products
export function getBestSellerProducts(): Product[] {
  return products.filter((product) => product.isBestSeller)
}

// Helper function to get new arrival products
export function getNewArrivalProducts(): Product[] {
  return products.filter((product) => product.isNewArrival)
}

// Helper function to search products
export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    (product) =>
      product.title.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery),
  )
}
