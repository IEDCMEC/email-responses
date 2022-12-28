const speakerEmailRecipients = [
  "annamma, sudeepasdfasdfasdfsdafdsf@gmail.com",
  "aldrinjenson@gmail.com",
];
const sponsorEmailRecipients = [
  "sreehari1111111111111@gmail.com",
  "aldrinjenson@gmail.com",
];
const primaryEmailsList = [
  "iedcmec1111111@mec.ac.in",
  "aldrinjenson@gmail.com",
];

const urlParams = new URLSearchParams(window.location.search);
const state = urlParams.get("state");
const personName = urlParams.get("name");
const mailType = urlParams.get("type") || "";
const mailDate = urlParams.get("mailDate");
const pocEmail = urlParams.get("poc");
const currDate = new Date().toLocaleString();

const obj = {
  state,
  personName,
  "Person Type": mailType,
  mailDate,
  "Responded Time": currDate,
  "POC Email": pocEmail,
};

async function sendMail(toAll = false) {
  let toEmailList;
  if (toAll) {
    if (mailType?.toLoweCase() === "sponsor") {
      toEmailList = sponsorEmailRecipients;
    } else {
      toEmailList = speakerEmailRecipients;
    }
    toEmailList.push(pocEmail);
  } else {
    toEmailList = primaryEmailsList;
  }
  console.log(toEmailList);

  const url =
    "https://w2e9j471i2.execute-api.ap-south-1.amazonaws.com/dev/send-email";
  const text = Object.entries(obj).reduce(
    (acc, [key, value]) => acc + `${key}: ${value}\n`,
    ""
  );
  console.log(text);

  // return;
  const params = {
    subject: `${mailType} ${personName} - ${status}`,
    content: `Email Response:\n${text}`,
    toEmail: toEmailList,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
