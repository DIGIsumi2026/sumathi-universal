import { imageAssets } from './imageAssets';

export type CSRGalleryImage = {
  image: string;
  alt: string;
};

export type CSRSectionItem = {
  id: string;
  label: string;
  logo: string;
  outerBg: string;
  leftBg: string;
  galleryBg: string;
  accentColor: string;
  paragraphs: string[];
  gallery: CSRGalleryImage[];
};

export const csrSectionsData: CSRSectionItem[] = [
  {
    id: 'milina-matha',
    label: 'Milina Matha Foundation',
    logo: imageAssets.csr.milinaMatha.logo,
    outerBg: imageAssets.csr.milinaMatha.outerBg,
    leftBg: imageAssets.csr.milinaMatha.leftBg,
    galleryBg: imageAssets.csr.milinaMatha.galleryBg,
    accentColor: '#D4A64A',
    paragraphs: [
      'Following the demise of his beloved mother in 2017, Sumathipala established the "Milina Matha Foundation" in commemoration of her exemplary and benevolent life, and it through this Foundation that the legacy of the late Mrs. Sumathipala PhD is continued by her children, through projects designed and implemented provide educational assistance, and support for the dissemination and elevation of Buddhist teachings across the land.',
      'Activities include acknowledging and promoting the quality of Buddhist teaching in the Daham Schools, awarding scholarships for university candidates & students who have excelled at GCE O/L & A/L as well as annual donations of school books and educational needs of children of the staff of the Sumathi Universal Group of Companies.',
    ],
    gallery: [
      {
        image: imageAssets.csr.milinaMatha.gallery[0],
        alt: 'Milina Matha Foundation scholarship presentation',
      },
      {
        image: imageAssets.csr.milinaMatha.gallery[1],
        alt: 'Milina Matha Foundation group ceremony',
      },
    ],
  },

  {
  id: 'thilanga-sumathipala-foundation',
  label: 'Thilanga Sumathipala Foundation',
  logo: imageAssets.csr.thilangaFoundation.logo,
  outerBg: imageAssets.csr.thilangaFoundation.outerBg,
  leftBg: imageAssets.csr.thilangaFoundation.leftBg,
  galleryBg: imageAssets.csr.thilangaFoundation.galleryBg,
  accentColor: '#F26A2E',
  paragraphs: [
    'Founded in 2006 with the goal of creating a better future, the Thilanga Sumathipala Foundation, under the leadership of Hon. Thilanga Sumathipala, has impacted countless lives in the last decade through its many activities. The foundation’s work extends across a broad range of social and environmental needs including humanitarian needs, poverty alleviation and social development, environmental activities, urban development, disaster management, rehabilitation and more.',

    'Looking to the future, the Foundation has plans to implement programmes aimed towards empowering women, children, the elderly, youth and Buddhism.',
  ],
  gallery: [
    {
      image: imageAssets.csr.thilangaFoundation.gallery[0],
      alt: 'Thilanga Sumathipala Foundation book donation ceremony',
    },
    {
      image: imageAssets.csr.thilangaFoundation.gallery[1],
      alt: 'Thilanga Sumathipala Foundation community support group',
    },
    {
      image: imageAssets.csr.thilangaFoundation.gallery[2],
      alt: 'Thilanga Sumathipala Foundation Buddhist community programme',
    },
    {
      image: imageAssets.csr.thilangaFoundation.gallery[3],
      alt: 'Thilanga Sumathipala Foundation awareness programme',
    },
    {
      image: imageAssets.csr.thilangaFoundation.gallery[4],
      alt: 'Thilanga Sumathipala Foundation educational support donation',
    },
    {
      image: imageAssets.csr.thilangaFoundation.gallery[5],
      alt: 'Thilanga Sumathipala Foundation social service meeting',
    },
  ],
},
{
  id: 'sumathi-awards',
  label: 'Sumathi Awards',
  logo: imageAssets.csr.sumathiAwards.logo,
  outerBg: imageAssets.csr.sumathiAwards.outerBg,
  leftBg: imageAssets.csr.sumathiAwards.leftBg,
  galleryBg: imageAssets.csr.sumathiAwards.galleryBg,
  accentColor: '#D4A64A',
  paragraphs: [
    'In 1995, Mr. Thilanga Sumathipala, together with the National Youth Council, founded the Sumathi Awards to fill the void left by television awards. A total of 32 awards were presented, categorized into four sections: Best Awards, Popular Awards, Commercial Awards, and Merit Awards.',

    'The Sumathi Awards is an esteemed recognition presented annually by the Sumathi Group of Companies, Sri Lanka, honoring outstanding individuals within the country’s television industry. These awards acknowledge the remarkable contributions made by recipients to Sri Lanka’s teledrama sector and television programming landscape.',

    'The Sumathi ceremony stands as a highly anticipated television event in Sri Lanka, showcasing excellence and celebrating talent. Initiated in 1995, the Sumathi Awards continue to highlight and applaud excellence in television.',

    'The second Sumathi Awards ceremony in 1996 introduced the U. W. Sumathipala Award. From 2000 onwards, awards were distributed across five categories. The 2000 Sumathi Awards marked the inclusion of the Jury Award category, expanding the total to six categories until 2011. In the 2011 Sumathi Awards, the News and Other Broadcasting category was introduced. Subsequently, the Child Award category was added in the 2014 Sumathi Awards. Since then, between 50 and 55 Sumathi Awards have been presented annually under eight categories.',
  ],
  gallery: [
    {
      image: imageAssets.csr.sumathiAwards.gallery[0],
      alt: 'Sumathi Awards ceremony stage performance',
    },
    {
      image: imageAssets.csr.sumathiAwards.gallery[1],
      alt: 'Sumathi Awards official address at the ceremony',
    },
    {
      image: imageAssets.csr.sumathiAwards.gallery[2],
      alt: 'Sumathi Awards cultural event moment',
    },
    {
      image: imageAssets.csr.sumathiAwards.gallery[3],
      alt: 'Sumathi Awards stage dance performance',
    },
    {
      image: imageAssets.csr.sumathiAwards.gallery[4],
      alt: 'Sumathi Awards winners holding awards',
    },
    {
      image: imageAssets.csr.sumathiAwards.gallery[5],
      alt: 'Sumathi Awards trophies displayed at the event',
    },
    {
      image: imageAssets.csr.sumathiAwards.gallery[6],
      alt: 'Sumathi Awards honorees with trophies',
    },
  ],
},

];