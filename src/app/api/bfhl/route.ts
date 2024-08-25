import { NextRequest, NextResponse } from 'next/server';

const USER_ID = "your_name_ddmmyyyy";
const EMAIL = "your.email@college.edu";
const ROLL_NUMBER = "YOUR123456";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received body:', body); // Log received body

    const { data } = body;

    if (!Array.isArray(data)) {
      console.error('Invalid input: data is not an array');
      return NextResponse.json({ error: "Invalid input: data must be an array" }, { status: 400 });
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
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet,
    };

    console.log('Sending response:', response); // Log response
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Server error:', error); // Log server error
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}