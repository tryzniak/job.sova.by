import axios from "axios";

function transform(companies) {
  return companies.map(({ fields: company }) => {
    if (!company.coordinates) {
      company.coordinates = "";
    }

    if (!company.profession) {
      company.profession = [];
    }

    if (!company.disability) {
      company.disability = [];
    }
    company.recruitment = company.recruitment ? ["Есть"] : ["Нету"];
    company.region = company.region.split(",");
    company.training = company.training ? ["Есть"] : ["Нету"];
    company.coordinates = company.coordinates.split(", ");
    company.profession = company.profession.sort();
    company.disability = company.disability.sort();
    company.experience = company.experience ? ["Есть"] : ["Нету"];
    company.working_conditions = company.working_conditions
      ? ["Есть"]
      : ["Нету"];

    return company;
  });
}

async function fetchAll() {
  const url = process.env.GRIDSOME_AIRTABLE_API_URL;
  const token = process.env.GRIDSOME_AIRTABLE_API_TOKEN;
  let {
    data: { records: companies }
  } = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return transform(companies).sort((a, b) => b.id < a.id);
}

export default { fetchAll };
