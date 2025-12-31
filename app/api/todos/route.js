import { prisma } from "@/lib/prisma";

export async function GET() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });
  return Response.json(todos);
}

export async function POST(req) {
  const { text } = await req.json();

  const todo = await prisma.todo.create({
    data: { text },
  });

  return Response.json(todo);
}

export async function PUT(req) {
  const { id, completed } = await req.json();

  const todo = await prisma.todo.update({
    where: { id },
    data: { completed },
  });

  return Response.json(todo);
}

export async function DELETE(req) {
  const { id } = await req.json();

  await prisma.todo.delete({
    where: { id },
  });

  return Response.json({ success: true });
}
