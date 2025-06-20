import { Box, Button, Input } from '@mui/material';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionsService } from '../../services/sectionsService';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateSectionDto } from 'dto-lib';


export function AddSection() {
  const redir = useNavigate();
  function BackButtonHandler() {
    redir(-1);
  }

  const [sectionName, setSectionName] = useState<string>('');
  const [sectionStatus, setSectionStatus] = useState<string>('');

  const handleSave = useCallback(async (name?: string, status?: string) => {
    const sectionsService = new SectionsService(); // TODO: move to context or other global

    const createServiceDto = plainToInstance(CreateSectionDto, {
      name,
      status,
    });
    const validationErrors = await validate(createServiceDto, {
      groups: ['FE'],
    });
    if (validationErrors.length > 0) {
      console.error('Local validation errors:', validationErrors);
      // return;
    }

    const section = sectionsService.prepare({ name, status });
    await sectionsService.post(section);
    setSectionStatus('');
    setSectionName('');
  }, []);

  return (
    <Box>
      <button onClick={BackButtonHandler}>Back</button>
      <Box className="P2" style={{ fontSize: '40px' }}>
        <h1>Page2 content - Create sections</h1>
      </Box>

      <Box>
        Section Name:{' '}
        <Input
          onChange={(e) => setSectionName(e.target.value)}
          value={sectionName}
        ></Input>
      </Box>
      <Box>
        Section Status:{' '}
        <Input
          onChange={(e) => setSectionStatus(e.target.value)}
          value={sectionStatus}
        ></Input>
      </Box>
      <Box>
        <Button
          variant="contained"
          onClick={() => handleSave(sectionName, sectionStatus)}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
