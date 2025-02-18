export function Chart({ data }) {
  // console.log('data: ',data)
  return (
    <ul className="chart">
      {data.map((item, idx) => (
        <li key={idx}>
          <span title={item.title} style={{ height: item.value + '%' }}>
            {item.value + '%'}
          </span>
        </li>
      ))}
    </ul>
  )
}
