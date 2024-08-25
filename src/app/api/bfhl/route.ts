import { NextRequest, NextResponse } from 'next/server';

const USER_ID = "prathyush_kodhanpur_19022003"; 
const EMAIL = "prathyush.kodhanpur2021@vitstudent.ac.in";
const ROLL_NUMBER = "21BCE0930";

export async function GET() {
  return NextResponse.json({ operation_code: 1 }, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data } = body;

    if (!Array.isArray(data)) {
      return NextResponse.json({ is_success: false, error: "Invalid input: data must be an array" }, { status: 400 });
    }

    const numbers = data.filter(item => !isNaN(Number(item)));
    const alphabets = data.filter(item => isNaN(Number(item)));
    const lowercaseAlphabets = alphabets.filter(char => char.toLowerCase() === char);
    const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];

    const response = {
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ is_success: false, error: "Internal server error" }, { status: 500 });
  }
}
