export type TimelineType = {
  id?: any;
  no?: string;
  date?: Date;
  person?: string;
  remarks?: string;
  role?: string;
};

export const dummyTimeLine: Array<TimelineType> = [
  {
    id: 1,
    no: "NO/2022/01",
    date: new Date("2022-06-9 9:40:20"),
    person: "Mr. Martinus Deny Eka Janresta",
    remarks: "Confirmation",
    role: "OPB1 - BM Technical Superintendan 1",
  },
  {
    id: 2,
    no: "NO/2022/01",
    date: new Date("2022-06-10 11:25:50"),
    person: "Mr. Martinus Deny Eka Janresta",
    remarks: "Approval",
    role: "BM Technical Superintendan 1",
  },
  {
    id: 4,
    no: "NO/2022/01",
    date: new Date("2022-06-11 9:25:50"),
    person: "Mr. Hamim Hamzah",
    remarks: "627.00 unit allocated to Material Used W/H:KALSMD",
    role: "Technical Manager",
  },
  {
    id: 5,
    no: "NO/2022/01",
    person: "Mr. Hamim Hamzah",
    remarks: "Approval",
    role: "Technical Manager",
  },
];

type CheckType = {
  id: any;
  desc: string;
  checked: boolean;
};

export const PrivOpt: CheckType[] = [{ id: 0, desc: "Read", checked: false },{ id: 1, desc: "Write", checked: false }];
