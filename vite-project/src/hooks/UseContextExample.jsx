import { useContext } from "react"

const Child = () => {
    return <div>
        In direct child
    </div>
}
const SubChild = () => {
    return <div>
        <h1>Sub Child</h1>
    </div>
}

const UseContextExample = () => {
    const Data = useContext('data');
   
   
  return <div></div>;
};

export default UseContextExample;

// use cases

// used for sharing data between un-related components like sharing data from parent to sub childs (not-direct child)