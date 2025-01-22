import{ Box } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { getArticles } from '../../services/articlesService';
import { useEffect, useState } from 'react';
import { Article } from '../../types/Article';
export function P1() {
  const [articles, setArticles] = useState<Article[]>([]);
  const redir = useNavigate();
  function BackButtonHandler() {
    redir(-1);
  }

  useEffect(() => {
    getArticles().then((gotArticles) => setArticles(gotArticles));
  }, []);

  return (
    <Box>
      <button onClick={BackButtonHandler}>Back</button>
      <Box className="P1" style={{ fontSize: '40px' }}>
        <h1>Page1 content</h1>
        {articles.map((article) => (
          <Box key={article.id}>
            {article.name}: {article.content}
          </Box>
        ))}
      </Box>
    </Box>
  );
}