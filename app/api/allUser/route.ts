import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../prisma/client';

export async function GET(req: NextRequest) {
  try {
    const getAllUsers = await prisma.member.findMany({
        select:{
            id:true,
            name:true,
            nickname:true,
            picture:true,
            point:true
        }
    });
    
    if (getAllUsers) {
      return NextResponse.json(getAllUsers, {
        status: 200,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'An error occurred while fetching users' },
      {
        status: 502,
      }
    );
  }
}
