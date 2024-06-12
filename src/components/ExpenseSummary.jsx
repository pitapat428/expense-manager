import { useState } from 'react';
import styled from 'styled-components';

const SummaryContainer = styled.div`
  margin: 0;
  border: 0;
  font: inherit;
  vertical-align: baseline;
  padding: 20px;
  background-color: rgb(255, 255, 255);
  border-radius: 16px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;

const TotalAmount = styled.div`
  margin-bottom: 20px;
`;

const CategoryFilter = styled.select`
  margin-bottom: 20px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const BarContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-end;
`;

const Bar = styled.div`
  height: 50px;
  background-color: ${(props) => props.color};
  width: ${(props) => props.width}%;
  border-radius: 4px;
`;

const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
`;

const ColorBox = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.color};
  margin-right: 10px;
  border-radius: 4px;
`;

const COLORS = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8'];
const FILTER_OPTIONS = {
  CATEGORY: 'category',
  USER: 'createdBy',
};

const ExpenseSummary = ({ expenses = [], month }) => {
  const [filter, setFilter] = useState(FILTER_OPTIONS.CATEGORY);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const uniqueKeys = [
    ...new Set(expenses.map((expense) => expense[filter])),
  ].filter((key) => key);

  const calculateTotals = (key) => {
    return key.map((item) => {
      const itemAmount = expenses
        .filter((expense) => expense[filter] === item)
        .reduce((sum, expense) => sum + expense.amount, 0);
      const itemPercentage = (itemAmount / totalAmount) * 100;
      return { item, amount: itemAmount, percentage: itemPercentage };
    });
  };

  const displayData = calculateTotals(uniqueKeys);

  return (
    <SummaryContainer>
      <TotalAmount>{`${month}월 총 지출: ${totalAmount.toLocaleString()} 원`}</TotalAmount>
      <CategoryFilter value={filter} onChange={handleFilterChange}>
        <option value={FILTER_OPTIONS.CATEGORY}>카테고리별</option>
        <option value={FILTER_OPTIONS.USER}>사용자별</option>
      </CategoryFilter>
      <BarContainer>
        {displayData.map((data, index) => (
          <Bar
            key={index}
            color={COLORS[index % COLORS.length]}
            width={data.percentage}
          >
            {data.percentage.toFixed(2)}%
          </Bar>
        ))}
      </BarContainer>
      <LegendContainer>
        {displayData.map((data, index) => (
          <LegendItem key={index}>
            <ColorBox color={COLORS[index % COLORS.length]} />
            {`${
              data.item
            }: ${data.amount.toLocaleString()} 원 (${data.percentage.toFixed(
              2
            )}%)`}
          </LegendItem>
        ))}
      </LegendContainer>
    </SummaryContainer>
  );
};

export default ExpenseSummary;
