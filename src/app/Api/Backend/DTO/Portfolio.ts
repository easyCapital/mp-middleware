interface Portfolio {
  product: string;
  amount: number;
  funds: {
    id: number;
    weight: number;
  }[];
}

export default Portfolio;
