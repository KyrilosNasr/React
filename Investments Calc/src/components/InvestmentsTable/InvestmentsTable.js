import tableStyle from './InvestmentsTable.module.css';

const formmater = new Intl.NumberFormat('en-us', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits:2
})
const InvestmentsTable = (props) => {
    return (
        <table className={tableStyle.result}>
        <thead>
          <tr>
            <th>Year</th>
            <th>Total Savings</th>
            <th>Interest (Year)</th>
            <th>Total Interest</th>
            <th>Invested Capital</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((yearData) => {   
         return <tr key={yearData.year}>
            <td>{yearData.year}</td>
            <td>{formmater.format(yearData.savingsEndOfYear)}</td>
            <td>{formmater.format(yearData.yearlyInterest)}</td>
            <td>{formmater.format(yearData.savingsEndOfYear - props.intialInvestment - yearData.yearlyContribution * yearData.year)}</td>
            <td>{formmater.format(props.intialInvestment + yearData.yearlyContribution * yearData.year)}</td>
          </tr>
          })}
        </tbody>
      </table>
    )
}

export default InvestmentsTable;