"use client";
import {useState, useEffect} from 'react'
import PromptCard from '@components/PromptCard'

const PromptCardList = ({data, handleTagClick}) =>{
  return(
    <div className='mt-16 prompt_layout'>
      {data.map((post)=>(
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick}/>
      ))}
    </div>
  )
}

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText]=useState('');
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const filterPrompts = (searchText) => {
    const regex =  new RegExp(searchText, 'i');// case-insensitive search 'i'
    return allPosts.filter((item)=>
      regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.prompt)
    )
  }
  
  const handleSearchChange = (e)=>{
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(()=>{
        const res = filterPrompts(e.target.value);
        setSearchedResults(res);
      }, 500)
    )
  }
  
  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const result = filterPrompts(tagName);
    setSearchedResults(result);
  }

  useEffect(() => {
    const fetchPosts = async ()=>{
      const response = await fetch('api/prompt');
      const data = await response.json();
      setAllPosts(data);
    }
    fetchPosts();
  }, [])
  
  return (
    <section className='feed'>
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Search for tag or username" value={searchText} onChange={handleSearchChange} required className="search_input peer"/>
      </form>
      <PromptCardList data={searchText ? searchedResults : allPosts} handleTagClick={handleTagClick}/>
    </section>
  )
}

export default Feed