import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Business Owner'];
  const roles = ['Business Owner', 'Accountant', 'Financial Analyst', 'Admin', 'Employee'];
  const applicationName = 'FinMaster';
  const tenantName = 'Business Organization';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `1. Business Owner:
   a. As a business owner, I want to be able to create and manage my organization's account on the platform, so that I can have control over my business's financial data.
   b. As a business owner, I want to be able to invite and manage my employees (accountants, financial analysts, and admins) to the platform, so that they can access and work on the financial data.
   c. As a business owner, I want to be able to view and analyze financial reports and trends, so that I can make informed decisions for my business.
   d. As a business owner, I want to be able to set permissions and access levels for my employees, so that I can ensure the security and privacy of my business's financial data.
   e. As a business owner, I want to be able to integrate the platform with other tools and services, so that I can streamline my business processes.

2. Accountant:
   a. As an accountant, I want to be able to manage and update the financial records of the business, so that the data is accurate and up-to-date.
   b. As an accountant, I want to be able to track expenses and categorize them, so that I can maintain an organized record of the business's spending.
   c. As an accountant, I want to be able to generate financial reports, so that I can provide insights to the business owner and other team members.
   d. As an accountant, I want to be able to collaborate with other team members on the platform, so that we can work together efficiently.

3. Financial Analyst:
   a. As a financial analyst, I want to be able to access and analyze the business's financial data, so that I can provide insights and recommendations.
   b. As a financial analyst, I want to be able to create and manage financial forecasts, so that the business can plan for the future.
   c. As a financial analyst, I want to be able to collaborate with other team members on the platform, so that we can work together efficiently.

4. Admin:
   a. As an admin, I want to be able to manage user accounts and permissions, so that I can ensure the security and privacy of the business's financial data.
   b. As an admin, I want to be able to manage the platform's settings and integrations, so that I can customize the platform to meet the business's needs.
   c. As an admin, I want to be able to provide support to other team members, so that they can use the platform effectively.

5. Employee (not a member of the Business Organization):
   a. As an employee, I want to be able to submit expense reports and receipts, so that I can be reimbursed for my work-related expenses.
   b. As an employee, I want to be able to view my own financial data, such as payroll information and expense history, so that I can keep track of my finances.
   c. As an employee, I want to be able to communicate with my organization's financial team through the platform, so that I can ask questions and receive support.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="20px" bottom="20px" zIndex={3}>
      <Popover placement="top">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody maxH="400px" overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application. Feel free to remove this tutorial with the{' '}
              <Box as="span" bg="yellow.300" p={1}>
                NEXT_PUBLIC_SHOW_BRIEFING
              </Box>{' '}
              environment variable.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
