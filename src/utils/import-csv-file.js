// import { parse } from 'csv-parse';
// import fs from 'node:fs'

// const path = new URL('../assets/tasks.csv', import.meta.url)

// const stream = fs.createReadStream(csvPath)

// const parser = parse({
//   delimiter: ',',
//   skip_empty_lines: true,
//   from_line: 2
// })

// console.log(csvPath);

import fs from 'node:fs'
import { parse } from 'csv-parse';

(async () => {
  const path = new URL('../assets/tasks.csv', import.meta.url)
  const stream = fs.createReadStream(path)

  const parser = parse({
    delimiter: ',',
    skip_empty_lines: true,
    from_line: 2
  })

  const lineParsed = stream.pipe(parser)

  for await (const line of lineParsed) {
    const [title, description] = line

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      })
    })
  }
})();