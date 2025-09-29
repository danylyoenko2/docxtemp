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
    { name: "Дисципліна", message: "Введіть дисципліну:" },
    { name: "Тема", message: "Введіть тему:" },
    { name: "НомерЛР", message: "Номер ЛР:" },
    { name: "Професор", message: "Введіть професора:" },
    { name: "НазваЛР", message: "Введіть назву ЛР:" },
  ]);

  try {
    doc.render(data);
  } catch (error) {
    console.log(`Помилка при створені титулки! ${error}`);
  }
  const buf = doc.toBuffer();
  fs.writeFileSync(`output/${data.НазваЛР}.docx`, buf);
  console.log("Успішно створена титулка!");
};

run();
