import { Box, Button, Input } from '@mui/material';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArticlesService } from '../../services/articlesService';
import { Article } from '../../types/Article';
export function P2() {
  const redir = useNavigate();
  function BackButtonHandler() {
    redir(-1);
  }

  const [articleName, setArticleName] = useState<string>('');
  const [articleContent, setArticleContent] = useState<string>('');
  const handleSave = useCallback(async (name?: string, content?: string) => {
    if (!name || !content) {
      console.error('Mandatory value not set');
      return;
    }
    const articlesService = new ArticlesService(); // TODO: move to context or other global
    const defaultArticleData: Article = {
      section: 'defaultSection',
      content: 'no content',
      name: 'no name',
      status: 'draft',
    };
    await articlesService.postArticle({
      ...defaultArticleData,
      name,
      content,
    });
    setArticleContent('');
    setArticleName('');
  }, []);

  return (
    <Box>
      <button onClick={BackButtonHandler}>Back</button>
      <Box className="P2" style={{ fontSize: '40px' }}>
        <h1>Page2 content</h1>
      </Box>
      <Box>
        Name:{' '}
        <Input
          onChange={(e) => setArticleName(e.target.value)}
          value={articleName}
        ></Input>
      </Box>
      <Box>
        Content:{' '}
        <Input
          onChange={(e) => setArticleContent(e.target.value)}
          value={articleContent}
        ></Input>
      </Box>
      <Box>
        <Button
          variant="contained"
          onClick={() => handleSave(articleName, articleContent)}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
