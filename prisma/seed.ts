import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function main() {

  //* Goals *//
  const goals = await prisma.goal.createMany({
    data: [
      {
        name: "Diário", description: `Diário`, tag: "daily"
      },
      {
        name: "Semanal", description: `Semanal`, tag: "weekly"
      },
      {
        name: "Mensal", description: `Mensal`, tag: "monthly"
      },
      {
        name: "Anual", description: `Anual`, tag: "annual"
      },
      
    ]
  })

  //* Categories *//
  const categories = await prisma.category.createMany({
    data: [
      {
        name: "Saúde", description: `Saúde`, tag: "health"
      },
      {
        name: "Produtividade", description: `Produtividade`, tag: "productivity"
      },
      {
        name: "Bem-Estar", description: `Bem-Estar`, tag: "well-being"
      },
      
    ]
  })


}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
