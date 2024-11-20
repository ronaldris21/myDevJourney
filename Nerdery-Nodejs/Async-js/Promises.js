//Promises states!
//      -   Pending
//      -   Fulfilled
//      -   Rejected

// Promises are not lazy

async function printFiles() {
  const files = await getFilePaths();

  await Promise.all(
    files.map(async (file) => {
      const contents = await fs.readFile(file, "utf8");
      console.log(contents);
    })
  );
}
