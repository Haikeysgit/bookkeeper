import { ButtonGroup, IconButton, Tooltip } from '@chakra-ui/react';
import type { ViewMode } from '../types';

interface ViewToggleProps {
    viewMode: ViewMode;
    onChange: (mode: ViewMode) => void;
}

// Simple icons using Unicode symbols
const TableIcon = () => <span style={{ fontSize: '18px' }}>☰</span>;
const GridIcon = () => <span style={{ fontSize: '18px' }}>⊞</span>;

const ViewToggle = ({ viewMode, onChange }: ViewToggleProps) => {
    return (
        <ButtonGroup size="md" isAttached variant="outline">
            <Tooltip label="Table View" hasArrow>
                <IconButton
                    aria-label="Table view"
                    icon={<TableIcon />}
                    onClick={() => onChange('table')}
                    colorScheme={viewMode === 'table' ? 'brand' : 'gray'}
                    variant={viewMode === 'table' ? 'solid' : 'outline'}
                />
            </Tooltip>
            <Tooltip label="Grid View" hasArrow>
                <IconButton
                    aria-label="Grid view"
                    icon={<GridIcon />}
                    onClick={() => onChange('grid')}
                    colorScheme={viewMode === 'grid' ? 'brand' : 'gray'}
                    variant={viewMode === 'grid' ? 'solid' : 'outline'}
                />
            </Tooltip>
        </ButtonGroup>
    );
};

export default ViewToggle;
