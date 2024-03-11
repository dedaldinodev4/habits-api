import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function main() {

  //* Goals *//
  const goals = await prisma.goal.createMany({
    data: [
      {
        name: "Diário", tags: "daily"
      },
      {
        name: "Semanal", tags: "weekly"
      },
      {
        name: "Mensal", tags: "monthly"
      },
      {
        name: "Anual", tags: "annual"
      },
      
    ]
  })

  //* Categories *//
  const categories = await prisma.category.createMany({
    data: [
      {
        name: "Saúde", description: `Saúde`, tags: "health"
      },
      {
        name: "Produtividade", description: `Produtividade`, tags: "productivity"
      },
      {
        name: "Bem-Estar", description: `Bem-Estar`, tags: "well-being"
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
