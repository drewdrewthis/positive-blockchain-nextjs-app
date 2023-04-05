const FORM_ID = "1FAIpQLSekFpZpdRC8mGFkDoJREahh9OTrwjwK0n2XU1uVkLwR7qQHsw";

const QUESTION_MAP = {
  "277135326": "isPositiveBlockchain",
  "2004577109": "projectName",
  "1053708935": "website",
  "1717984751": "categories",
  "1933785038": "tags",
  "1677996722": "shortDescription",
  "619729179": "longDescription",
  "806289706": "hqCity",
  "351096717": "hqCountry",
  "368610616": "servicingCountry",
  "522376294": "yearOfCreation",
  "1196002001": "projectType",
  "134140778": "videoLink",
  "1057054965": "tokenName",
  "106670733": "blockchainTechnology",
  "1202877374": "reasons",
};

export function createPrefilledLink(
  answers: Partial<{
    isPositiveBlockchain: boolean;
    projectName: string;
    website: string;
    categories: string[];
    tags: string;
    shortDescription: string;
    longDescription: string;
    hqCity: string;
    hqCountry: string;
    servicingCountry: string;
    yearOfCreation: string;
    projectType: string;
    videoLink: string;
    tokenName: string;
    blockchainTechnology: string;
    reasons: string[];
  }>
) {
  const isPositiveBlockchain = answers.isPositiveBlockchain ? "Yes" : "No";
  const categories = answers.categories?.join("+%26+");
  const reasons = answers.reasons?.join("+%26+");

  const baseUrl = `https://docs.google.com/forms/d/e/${FORM_ID}/viewform?usp=pp_url`;

  const params = new URLSearchParams(
    removeUndefinedValues({
      "entry.277135326": isPositiveBlockchain,
      "entry.2004577109": answers.projectName,
      "entry.1053708935": answers.website,
      "entry.1717984751": categories,
      "entry.1933785038": answers.tags,
      "entry.1677996722": answers.shortDescription,
      "entry.619729179": answers.longDescription,
      "entry.806289706": answers.hqCity,
      "entry.351096717": answers.hqCountry,
      "entry.368610616": answers.servicingCountry,
      "entry.522376294": answers.yearOfCreation,
      "entry.1196002001": answers.projectType,
      "entry.134140778": answers.videoLink,
      "entry.1057054965": answers.tokenName,
      "entry.106670733": answers.blockchainTechnology,
      "entry.1202877374": reasons,
    })
  );

  return `${baseUrl}&${params.toString()}`;
}

function removeUndefinedValues(obj: any) {
  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key] !== undefined) {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as any);
}

// const raw = {
//   "100875001":
//     '100875001,"What is your organization type?","please select the most relevant one",2,[[1196002001,[["start-up",null,null,null,false],["corporate",null,null,null,false],["partnership",null,null,null,false],["Private-Public-Partnership",null,null,null,false],["government",null,null,null,false],["open-source",null,null,null,false],["DAO",null,null,null,false],["non-profit",null,null,null,false],["foundation",null,null,null,false],["academic",null,null,null,false],["ad-hoc project",null,null,null,false],["other",null,null,null,false]],false,[],[],null,null,null,false,null,[null,[]]]],null,null,null,[],null,null,[null,"What is your organization type?"],[null,"please select the most relevant one"]],"i94","i95","i96"',
//   "213250381":
//     '213250381,"Presentation video","preference for youtube/vimeo links or any similar platform",0,[[134140778,[],false,[],[],null,null,null,null,null,[null,[]]]],null,null,null,[],null,null,[null,"Presentation video"],[null,"preference for youtube/vimeo links or any similar platform"]],"i134","i135","i136"',
//   "301510608":
//     '301510608,"Your headquarter country (if any)",null,0,[[351096717,[],false,[],[],null,null,null,null,null,[null,[]]]],null,null,null,[],null,null,[null,"Your headquarter country (if any)"]],"i82","i83","i84"',
//   "367655785":
//     '367655785,"Your email (will be kept internally only)",null,0,[[310798527,[],true,[],[],null,null,null,null,null,[null,[]]]],null,null,null,[],null,null,[null,"Your email (will be kept internally only)"]],"i195","i196","i197"',
//   "381345673":
//     '381345673,"Project name",null,0,[[2004577109,[],true,[],[],null,null,null,null,null,[null,[]]]],null,null,null,[],null,null,[null,"Project name"]],"i11","i12","i13"',
//   "394953236":
//     '394953236,"Any other information you want to highlight?",null,1,[[631594701,[],false,[],[],null,null,null,null,null,[null,[]]]],null,null,null,[],null,null,[null,"Any other information you want to highlight?"]],"i187","i188","i189"',
//   "425285868":
//     '425285868,"Your headquarter city (if any)",null,0,[[806289706,[],false,[],[],null,null,null,null,null,[null,[]]]],null,null,null,[],null,null,[null,"Your headquarter city (if any)"]],"i78","i79","i80"',
//   "456451932":
//     '456451932,"Your servicing countries (local activity)","Where you have local project implementation or presence. Example: \\"Kenya, Tanzania, Mozambique\\". If global, simply write \\"global\\"",1,[[368610616,[],false,[],[],null,null,null,null,null,[null,[]]]],null,null,null,[],null,null,[null,"Your servicing countries (local activity)"],[null,"Where you have local project implementation or presence. Example: \\"Kenya, Tanzania, Mozambique\\". If global, simply write \\"global\\""]],"i86","i87","i88"',
//   "518596042":
//     '518596042,"Category of your project","3 categories maximum. Important for our classification within the database. Detail on categories and sub-categories here https://www.notion.so/positiveblockchain/PB-Database-wiki-4eea2421bca64fa48f49dbf4e0752b5c",4,[[1717984751,[["Agriculture \\u0026 Food",null,null,null,false],["Aid \\u0026 Philanthropy",null,null,null,false],["Climate \\u0026 Environment",null,null,null,false],["Digital content \\u0026 Arts",null,null,null,false],["Education \\u0026 Employment",null,null,null,false],["Energy",null,null,null,false],["Finance \\u0026 Insurance",null,null,null,false],["Government \\u0026 Democracy",null,null,null,false],["Health",null,null,null,false],["Identity \\u0026 Ownership",null,null,null,false],["Internet \\u0026 Telco",null,null,null,false],["Logistics \\u0026 Traceability",null,null,null,false],["Products \\u0026 Consumption",null,null,null,false],["Transport \\u0026 Infrastructure",null,null,null,false]],true,[],[[7,201,["3"]]],null,null,null,false,null,[null,[]]]],null,null,null,[],null,null,[null,"Category of your project"],[null,"3 categories maximum. Important for our classification within the database. Detail on categories and sub-categories here \\u003ca href\\u003d\\"https://docs.google.com/spreadsheets/d/1hDGvkpqP94rUNvZL9pXFMcW0zGVisO6e4uHXMxwfHDo/\\"\\u003ehttps://www.notion.so/positiveblockchain/PB-Database-wiki-4eea2421bca64fa48f49dbf4e0752b5c\\u003c/a\\u003e"]],"i19","i20","i21"',
//   "661982948":
//     '661982948,"Is your project a PositiveBlockchain project? ","This means you have a strong aim at creating a positive social or environmental impact and solve some of our world’s burning problems (SDGs) through the use of blockchain and DLTs. We don\'t intend to least the entire blockchain ecosystem, but rather have a focus on projects commited to the SDGs. Note: your project should be focusing on developing of implementation a concrete blockchain solution.",2,[[277135326,[["Yes",null,null,null,false],["No",null,null,null,false]],true,[],[],null,null,null,false,null,[null,[]]]],null,null,null,[],null,null,[null,"Is your project a PositiveBlockchain project? "],[null,"This means you have a strong aim at creating a positive social or environmental impact and solve some of our world’s burning problems (SDGs) through the use of blockchain and DLTs. We don\'t intend to least the entire blockchain ecosystem, but rather have a focus on projects commited to the SDGs. Note: your project should be focusing on developing of implementation a concrete blockchain solution."]],"i1","i2","i3"',
//   "921794884":
//     '921794884,"Tags (eg. supply chain, fisheries). Tags help with the searcheability of your project in our database.",null,0,[[1933785038,[],false,[],[],null,null,null,null,null,[null,[]]]],null,null,null,[],null,null,[null,"Tags (eg. supply chain, fisheries). Tags help with the searcheability of your project in our database."]],"i66","i67","i68"',
//   "942096287":
//     '942096287,"Token name","if any, in capital letters",0,[[1057054965,[],false,[],[],null,null,null,null,null,[null,[]]]],null,null,null,[],null,null,[null,"Token name"],[null,"if any, in capital letters"]],"i138","i139","i140"',
//   "1092721524":
//     '1092721524,"Any comment for us? How can PositiveBlockchain.io help you (connecting to peers and project owners, communication, advise, launches, fundraising...?)",null,1,[[69807550,[],false,[],[],null,null,null,null,null,[null,[]]]],null,null,null,[],null,null,[null,"Any comment for us? How can PositiveBlockchain.io help you (connecting to peers and project owners, communication, advise, launches, fundraising...?)"]],"i229","i230","i231"',
//   "1220716213":
//     '1220716213,"Year of creation","When was your project founded? (YYYY)",0,[[522376294,[],false,[],[],null,null,null,null,null,[null,[]]]],null,null,null,[],null,null,[null,"Year of creation"],[null,"When was your project founded? (YYYY)"]],"i90","i91","i92"',
//   "1233753833":
//     '1233753833,"I understand that the information above can be used by PositiveBlockchain and also published on http://positiveblockchain.io. You can request to correct, remove or block incorrect data by sending an email to hello@positiveblockchain.io",null,2,[[197956156,[["Yes",null,null,null,false],["No",null,null,null,false]],true,[],[],null,null,null,false,null,[null,[]]]],null,null,null,[],null,null,[null,"I understand that the information above can be used by PositiveBlockchain and also published on \\u003ca href\\u003d\\"http://positiveblockchain.io\\"\\u003ehttp://positiveblockchain.io\\u003c/a\\u003e. You can request to correct, remove or block incorrect data by sending an email to \\u003ca href\\u003d\\"mailto:hello@positiveblockchain.io\\"\\u003ehello@positiveblockchain.io\\u003c/a\\u003e"]],"i219","i220","i221"',
//   "1284268040":
//     '1284268040,"Do you want to receive our newsletter (project updates, new projects listed, interviews of blockchain for good entrepreneurs, etc..)?",null,2,[[939944426,[["Yes",null,null,null,false],["No",null,null,null,false]],false,[],[],null,null,null,false,null,[null,[]]]],null,null,null,[],null,null,[null,"Do you want to receive our newsletter (project updates, new projects listed, interviews of blockchain for good entrepreneurs, etc..)?"]],"i209","i210","i211"',
//   "1594560930":
//     '1594560930,"Are you the project owner?",null,2,[[919160091,[["Yes",null,null,null,false],["No",null,null,null,false]],true,[],[],null,null,null,false,null,[null,[]]]],null,null,null,[],null,null,[null,"Are you the project owner?"]],"i199","i200","i201"',
//   "1599170770":
//     '1599170770,"Your name",null,0,[[965261755,[],true,[],[],null,null,null,null,null,[null,[]]]],null,null,null,[],null,null,[null,"Your name"]],"i191","i192","i193"',
//   "1687056635":
//     '1687056635,"Long description","Feel free to use this to detail your activity and mention figures, KPIs, partners, notable facts about your project and its impact.",1,[[619729179,[],false,[],[],null,null,null,null,null,[null,[]]]],null,null,null,[],null,null,[null,"Long description"],[null,"Feel free to use this to detail your activity and mention figures, KPIs, partners, notable facts about your project and its impact."]],"i74","i75","i76"',
//   "1699393089":
//     '1699393089,"Name the blockchain platforms/ technology.ies you mainly use ",null,0,[[106670733,[],false,[],[],null,null,null,null,null,[null,[]]]],null,null,null,[],null,null,[null,"Name the blockchain platforms/ technology.ies you mainly use "]],"i142","i143","i144"',
//   "1789144593":
//     '1789144593,"Short description","One or two sentences max!! (more details in \\"long description\\" below)",0,[[1677996722,[],true,[],[],null,null,null,null,null,[null,[]]]],null,null,null,[],null,null,[null,"Short description"],[null,"One or two sentences max!! (more details in \\u0026quot;long description\\u0026quot; below)"]],"i70","i71","i72"',
//   "1907688431":
//     '1907688431,"Your website",null,0,[[1053708935,[],true,[],[],null,null,null,null,null,[null,[]]]],null,null,null,[],null,null,[null,"Your website"]],"i15","i16","i17"',
//   "2075497813":
//     '2075497813,"Why are you using blockchain in your project? ",null,4,[[1202877374,[["Records and Verification",null,null,null,false],["Payments and Money Transfers",null,null,null,false],["Platforms and Marketplaces",null,null,null,false],["Digital Identity",null,null,null,false],["Supply Chain Management",null,null,null,false],["Smart Contracting",null,null,null,false],["Incentives",null,null,null,false],["Voting",null,null,null,false],["Copyright \\u0026 IP",null,null,null,false],["Various",null,null,null,false],["NA",null,null,null,false],["Other",null,null,null,false]],false,[],[],null,null,null,false,null,[null,[]]]],null,null,null,[],null,null,[null,"Why are you using blockchain in your project? "]],"i146","i147","i148"',
// };

// const linkTemplate = `
// https://docs.google.com/forms/d/e/${FORM_ID}/viewform?usp=pp_url&entry.277135326=Yes&entry.2004577109=test+project+name&entry.1053708935=test.com&entry.1717984751=Education+%26+Employment&entry.1717984751=Internet+%26+Telco&entry.1717984751=Transport+%26+Infrastructure&entry.1933785038=some+tags&entry.1677996722=some+description&entry.619729179=some+long+desctiption&entry.806289706=headquarter+city&entry.351096717=headquarter+country&entry.368610616=servicing+country&entry.522376294=year+of+creation&entry.1196002001=Private-Public-Partnership&entry.134140778=vimeo+link&entry.1057054965=token+name&entry.106670733=blockchain+platforms/technology&entry.1202877374=Records+and+Verification&entry.1202877374=Digital+Identity&entry.1202877374=Smart+Contracting&entry.1202877374=Voting
// `;
