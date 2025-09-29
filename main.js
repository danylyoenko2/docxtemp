import fs from "fs";
import pizZip from "pizzip";
import Docxtemplatr from "docxtemplater";
import inquirer from "inquirer";

const content = fs.readFileSync("shema/shema.docx", "binary");

const zip = new pizZip(content);
const doc = new Docxtemplatr(zip, {
  paragraphLoop: true,
  linebreaks: true,
});

const run = async () => {
  const data = await inquirer.prompt([
    { name: "Учень", message: "Введіть своє ім'я та фамілію:" },
    { name: "Дисципліна", message: "Введіть дисципліну:" },
    { name: "Тема", message: "Введіть тему:" },
    { name: "Варіант", message: "Введіть свій варіант:" },
    { name: "Мета", message: "Введіть мету: " },
    { name: "Завдання", message: "Введіть завдання" },
    { name: "НомерЛР", message: "Введіть номер ЛР:" },
    { name: "Викладач", message: "Введіть ім'я та фамілію професора:" },
    { name: "ВикладачСТ", message: "Введіть стать викладача(Викладач/ка):" },
    { name: "НазваЛР", message: "Введіть назву ЛР:" },
  ]);

  try {
    doc.render(data);
  } catch (error) {
    console.log(`Помилка при створені титулки! ${error}`);
  }
  const buf = doc.toBuffer();
  fs.writeFileSync(`output/${data.НазваЛР}.docx`, buf);
  console.log("Титулка успішно створена!");
};

run();
