import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    Text,
} from '@chakra-ui/react';
import { useRef } from 'react';

interface DeleteConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    bookNames: string[];
    isDeleting: boolean;
}

const DeleteConfirmDialog = ({
    isOpen,
    onClose,
    onConfirm,
    bookNames,
    isDeleting,
}: DeleteConfirmDialogProps) => {
    const cancelRef = useRef<HTMLButtonElement>(null);
    const isBulk = bookNames.length > 1;

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isCentered
        >
            <AlertDialogOverlay backdropFilter="blur(4px)" bg="blackAlpha.400">
                <AlertDialogContent borderRadius="xl" mx={4}>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        {isBulk ? `Delete ${bookNames.length} Books?` : 'Delete Book?'}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {isBulk ? (
                            <Text>
                                Are you sure you want to delete <strong>{bookNames.length} books</strong>?
                                This action cannot be undone.
                            </Text>
                        ) : (
                            <Text>
                                Are you sure you want to delete <strong>"{bookNames[0]}"</strong>?
                                This action cannot be undone.
                            </Text>
                        )}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button
                            ref={cancelRef}
                            onClick={onClose}
                            variant="outline"
                            isDisabled={isDeleting}
                        >
                            Cancel
                        </Button>
                        <Button
                            colorScheme="red"
                            onClick={onConfirm}
                            ml={3}
                            isLoading={isDeleting}
                            loadingText="Deleting..."
                        >
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default DeleteConfirmDialog;
