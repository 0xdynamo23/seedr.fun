"use client";

import React from 'react';
import { MaxWidthWrapper } from '@/components';
import { motion } from 'framer-motion';

const TermsConditions = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <MaxWidthWrapper className="py-10 sm:py-20">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8"
          variants={itemVariants}
        >
          Terms and Conditions
        </motion.h1>
        
        <motion.div 
          className="prose prose-emerald max-w-none text-gray-700"
          variants={itemVariants}
        >
          <p className="text-sm text-gray-500 mb-6">Last Updated: March 15, 2025</p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">1. Agreement to Terms</h2>
          <p>
            By accessing or using Seedr ("the Platform"), you agree to be bound by these Terms and Conditions ("Terms"). If you disagree with any part of these Terms, you may not access the Platform.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">2. Description of Service</h2>
          <p>
            Seedr is a platform that enables users to discover, support, and launch blockchain-based projects and initiatives. The Platform allows project creators to showcase their work and receive support from community members.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">3. User Accounts</h2>
          <p>
            To use certain features of the Platform, you must register for an account. You agree to provide accurate and complete information when creating your account and to update such information to keep it accurate and current.
          </p>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">4. User Content</h2>
          <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">4.1 Project Submissions</h3>
          <p>
            When submitting a project to the Platform, you represent and warrant that:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>You have the right to submit the content</li>
            <li>The content does not infringe on any intellectual property rights</li>
            <li>The content is accurate and not misleading</li>
            <li>The content complies with all applicable laws and regulations</li>
          </ul>
          
          <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">4.2 Comments and Feedback</h3>
          <p>
            By posting comments, feedback, or other content on the Platform, you grant us a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content throughout the world in any media.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">5. Prohibited Activities</h2>
          <p>You agree not to engage in any of the following activities:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Using the Platform for any illegal purpose</li>
            <li>Posting false, inaccurate, misleading, or defamatory content</li>
            <li>Harassing, abusing, or threatening other users</li>
            <li>Attempting to gain unauthorized access to the Platform or other users' accounts</li>
            <li>Using the Platform to transmit malware or viruses</li>
            <li>Interfering with the proper functioning of the Platform</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">6. Intellectual Property</h2>
          <p>
            The Platform and its original content, features, and functionality are owned by Seedr and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">7. Project Funding and Transactions</h2>
          <p>
            Seedr facilitates connections between project creators and supporters but is not directly involved in the transactions between users. Users are solely responsible for all agreements, transactions, and interactions with other users.
          </p>
          <p>
            We do not guarantee that any project will receive funding or that any project will be completed as described. Users acknowledge that supporting projects involves inherent risks.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">8. Limitation of Liability</h2>
          <p>
            In no event shall Seedr, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Platform.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">9. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless Seedr, its directors, employees, partners, agents, suppliers, and affiliates from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Platform.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">10. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws, without regard to its conflict of law provisions.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">11. Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">12. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at: 
            <a href="mailto:seedr@cyrostudios.com" className="text-emerald-600 hover:text-emerald-700"> seedr@cyrostudios.com</a>
          </p>
        </motion.div>
      </motion.div>
    </MaxWidthWrapper>
  );
};

export default TermsConditions; 