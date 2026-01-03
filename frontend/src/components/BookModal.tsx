import React, { useState, useEffect, useRef } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    useDisclosure,
    useToast,
    VStack,
    Select,
    FormErrorMessage,
    Text,
    FormHelperText,
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client/react';
import { CREATE_BOOK, UPDATE_BOOK } from '../graphql/queries';

interface BookModalProps {
    refetch: () => void;
    initialBook?: { id: number; name: string; description: string; category?: string };
    triggerButton?: React.ReactNode;
}

const CATEGORIES = ['Industrial', 'Municipal', 'Organic', 'E-Waste', 'Hazardous'];

const BookModal = ({ refetch, initialBook, triggerButton }: BookModalProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [name, setName] = useState(initialBook?.name || '');
    const [description, setDescription] = useState(initialBook?.description || '');
    const [category, setCategory] = useState(initialBook?.category || '');
    const [errors, setErrors] = useState<{ name?: string; description?: string; category?: string }>({});
    const toast = useToast();

    // GraphQL Mutations
    const [createBook, { loading: creating }] = useMutation(CREATE_BOOK);
    const [updateBook, { loading: updating }] = useMutation(UPDATE_BOOK);

    const isSubmitting = creating || updating;
    const isEdit = !!initialBook;
    const initialRef = useRef(null);

    const MAX_NAME_LENGTH = 100;
    const MAX_DESC_LENGTH = 500;

    useEffect(() => {
        if (initialBook) {
            setName(initialBook.name);
            setDescription(initialBook.description);
            setCategory(initialBook.category || '');
        } else {
            setName('');
            setDescription('');
            setCategory('');
        }
        setErrors({});
    }, [initialBook, isOpen]);

    const validate = () => {
        const newErrors: typeof errors = {};

        if (!name.trim()) {
            newErrors.name = 'Book name is required';
        } else if (name.length > MAX_NAME_LENGTH) {
            newErrors.name = `Book name must be ${MAX_NAME_LENGTH} characters or less`;
        }

        if (!category) {
            newErrors.category = 'Category is required';
        }

        if (!description.trim()) {
            newErrors.description = 'Description is required';
        } else if (description.length > MAX_DESC_LENGTH) {
            newErrors.description = `Description must be ${MAX_DESC_LENGTH} characters or less`;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        try {
            if (isEdit && initialBook) {
                await updateBook({
                    variables: {
                        updateBookInput: {
                            id: initialBook.id,
                            name,
                            description,
                            category, // Now supported by backend
                        },
                    },
                });
                toast({
                    title: 'Book updated successfully!',
                    status: 'success',
                    position: 'top-right',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                await createBook({
                    variables: {
                        createBookInput: {
                            name,
                            description,
                            category, // Now supported by backend
                        },
                    },
                });
                toast({
                    title: 'Book added successfully!',
                    status: 'success',
                    position: 'top-right',
                    duration: 3000,
                    isClosable: true,
                });
            }
            refetch(); // Refetch the list
            onClose();
            if (!isEdit) {
                setName('');
                setDescription('');
                setCategory('');
            }
        } catch (error) {
            console.error("Error saving book:", error);
            toast({
                title: 'Error saving book',
                description: 'Please try again later.',
                status: 'error',
                position: 'top-right',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const isFormValid = name.trim() && description.trim() && category &&
        name.length <= MAX_NAME_LENGTH && description.length <= MAX_DESC_LENGTH;

    return (
        <>
            {triggerButton ? (
                <div onClick={onOpen}>{triggerButton}</div>
            ) : (
                <Button
                    onClick={onOpen}
                    colorScheme={isEdit ? 'gray' : 'brand'}
                    variant={isEdit ? 'outline' : 'solid'}
                    width={isEdit ? 'full' : 'auto'}
                    leftIcon={!isEdit ? <span>+</span> : undefined}
                >
                    {isEdit ? 'Edit' : 'Add Book'}
                </Button>
            )}

            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
                isCentered
                size="lg"
                closeOnEsc={true}
            >
                <ModalOverlay backdropFilter="blur(4px)" bg="blackAlpha.300" />
                <ModalContent borderRadius="xl" boxShadow="xl">
                    <ModalHeader borderBottomWidth="1px" borderColor="gray.100" pb={4}>
                        {isEdit ? `Edit Book: ${initialBook?.name}` : 'Add New Book'}
                    </ModalHeader>
                    <ModalCloseButton mt={2} mr={2} />
                    <ModalBody py={6}>
                        <VStack spacing={5}>
                            {isEdit && (
                                <FormControl>
                                    <FormLabel fontWeight="medium" color="gray.600">ID</FormLabel>
                                    <Input
                                        value={`#${initialBook?.id}`}
                                        isReadOnly
                                        bg="gray.100"
                                        color="gray.500"
                                        cursor="not-allowed"
                                    />
                                    <FormHelperText fontSize="xs">Auto-generated, cannot be edited</FormHelperText>
                                </FormControl>
                            )}

                            <FormControl isRequired isInvalid={!!errors.name}>
                                <FormLabel fontWeight="medium" color="gray.600">
                                    Book Name <Text as="span" color="red.500">*</Text>
                                </FormLabel>
                                <Input
                                    ref={initialRef}
                                    placeholder="e.g. The Toxin Audit"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        if (errors.name) setErrors({ ...errors, name: undefined });
                                    }}
                                    focusBorderColor="brand.500"
                                    size="lg"
                                    fontSize="md"
                                    maxLength={MAX_NAME_LENGTH + 10}
                                />
                                {errors.name ? (
                                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                                ) : (
                                    <FormHelperText fontSize="xs">
                                        {name.length}/{MAX_NAME_LENGTH} characters
                                    </FormHelperText>
                                )}
                            </FormControl>

                            <FormControl isRequired isInvalid={!!errors.category}>
                                <FormLabel fontWeight="medium" color="gray.600">
                                    Category <Text as="span" color="red.500">*</Text>
                                </FormLabel>
                                <Select
                                    placeholder="Select a category"
                                    value={category}
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                        if (errors.category) setErrors({ ...errors, category: undefined });
                                    }}
                                    focusBorderColor="brand.500"
                                    size="lg"
                                    fontSize="md"
                                >
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </Select>
                                {errors.category && (
                                    <FormErrorMessage>{errors.category}</FormErrorMessage>
                                )}
                            </FormControl>

                            <FormControl isRequired isInvalid={!!errors.description}>
                                <FormLabel fontWeight="medium" color="gray.600">
                                    Description <Text as="span" color="red.500">*</Text>
                                </FormLabel>
                                <Textarea
                                    placeholder="Brief summary or notes about the book..."
                                    value={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                        if (errors.description) setErrors({ ...errors, description: undefined });
                                    }}
                                    focusBorderColor="brand.500"
                                    rows={4}
                                    size="lg"
                                    fontSize="md"
                                    maxLength={MAX_DESC_LENGTH + 10}
                                />
                                {errors.description ? (
                                    <FormErrorMessage>{errors.description}</FormErrorMessage>
                                ) : (
                                    <FormHelperText fontSize="xs">
                                        {description.length}/{MAX_DESC_LENGTH} characters
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </VStack>
                    </ModalBody>

                    <ModalFooter borderTopWidth="1px" borderColor="gray.100" pt={4}>
                        <Button variant="ghost" mr={3} onClick={onClose} isDisabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme="brand"
                            onClick={handleSubmit}
                            isLoading={isSubmitting}
                            loadingText="Saving..."
                            px={8}
                            isDisabled={!isFormValid}
                        >
                            {isEdit ? 'Save Changes' : 'Create Book'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default BookModal;
