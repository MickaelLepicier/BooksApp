

export function RateByTextbox({review, handleChange}){

    return    <input
    name='rating'
    value={review}
    onChange={handleChange}
    type="number"
/>
}