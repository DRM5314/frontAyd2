export class EditorialDto {
  id!:number;
  name!:string;
}

export class EditorialCreateDto{
  name!:string;
}

export class EditorialUpdateDto{
  id:any;
  name:any;
}

export class BookDto{
  code!:string;
  title!:string;
  auth!:string;
  quantity!:number;
  datePublication!:string;
  idEditorial!:EditorialDto;
}

export class BookCreateDto{
  code!:any;
  title!:any;
  auth!:any;
  quantity!:any;
  datePublication!:any;
  idEditorial!:any;
}

export class LoanCreateDto{
 bookCode!:any;
 carnet!:any;
 laonDate!:any;
 returnDate!:any;
 status!:any;
}
export class CareerDto{
  id!:number;
  name!:string;
}
export class CareerRequestDto{
  names!:string;
}
export class CareerUpdateRequestDto{
  id!:any;
  name!:any;
}
export class StudentCreateDto{
  name:any;
  idCareer:any;
  dteBirth:any;
  carnet:any;
}
export class StudentDto{
  id!:number;
  name!:string;
  idCareer!:CareerDto;
  dteBirth!:string;
  carnet!:string;
  status!:number;
}
export class LoanDto{
  id!:number;
  bookCode!:BookDto;
  carnet!:StudentDto;
  laonDate!:string;
  returnDate!:string;
  state!:string;
  loan_fee!:number;
  penalized_fee!:number;
  sanction_fee!:number;
}
export class Credentials{
  username!: string;
  password!: string;
}

export class reportTotalCashDto{
  loans!:LoanDto[];
  totalCashSanction!:number;
  totalCashNormal!:number;
  totalPenalized!:number;
}
export class reportMoreLoansCareer{
  career!:CareerDto;
  loans!:LoanDto[];
  totalLoans!:number;
}

