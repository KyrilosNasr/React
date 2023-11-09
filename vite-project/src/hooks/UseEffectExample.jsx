import { useEffect, useState } from "react";

const UseEffectExample = () => {
  const [resourceType, setResourceType] = useState("Posts");
  const [items, setitems] = useState([]);
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
      .then((response) => response.json())
      .then((json) => setitems(json));
    
    // dont forget about the return fn that works as cleaner or like ngOnDestroy 
  }, [resourceType]);
  return (
    <>
      <div>
        <button onClick={() => setResourceType("Posts")}>Posts</button>
        <button onClick={() => setResourceType("Users")}>Users</button>
        <button onClick={() => setResourceType("Comments")}>Comments</button>
      </div>
      <h1>{resourceType}</h1>
      {items.map((item) => {
        return <pre key={item.id}>{JSON.stringify(item)}</pre>;
      })}
    </>
  );
};

export default UseEffectExample;
