"use client";

import React from 'react';
import { MaxWidthWrapper } from '@/components';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
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
          Privacy Policy
        </motion.h1>
        
        <motion.div 
          className="prose prose-emerald max-w-none text-gray-700"
          variants={itemVariants}
        >
          <p className="text-sm text-gray-500 mb-6">Last Updated: March 15, 2025</p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Introduction</h2>
          <p>
            At Seedr ("we," "our," or "us"), we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Information We Collect</h2>
          <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">Personal Information</h3>
          <p>We may collect the following personal information:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Name and contact information (email address, wallet address)</li>
            <li>Account information when you register</li>
            <li>Profile information (username, avatar, bio)</li>
            <li>Communication data (messages, comments)</li>
            <li>Transaction information</li>
          </ul>
          
          <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">Technical Information</h3>
          <p>When you use our platform, we automatically collect:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Device information (browser type, IP address)</li>
            <li>Usage data (pages visited, time spent)</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">How We Use Your Information</h2>
          <p>We use your information for the following purposes:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and handle project submissions</li>
            <li>Communicate with you about our services</li>
            <li>Protect against fraudulent or unauthorized activity</li>
            <li>Comply with legal obligations</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Information Sharing</h2>
          <p>We may share your information with:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Service providers who perform services on our behalf</li>
            <li>Legal authorities when required by law</li>
            <li>Other users (limited to information you choose to make public)</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Your Rights</h2>
          <p>Depending on your location, you may have rights regarding your personal information, including:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Access to your personal information</li>
            <li>Correction of inaccurate information</li>
            <li>Deletion of your personal information</li>
            <li>Restriction of processing</li>
            <li>Data portability</li>
            <li>Objection to processing</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Cookies</h2>
          <p>
            We use cookies and similar technologies to enhance your experience on our platform. You can control cookies through your browser settings.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Children's Privacy</h2>
          <p>
            Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at: 
            <a href="mailto:seedr@cyrostudios.com" className="text-emerald-600 hover:text-emerald-700"> seedr@cyrostudios.com</a>
          </p>
        </motion.div>
      </motion.div>
    </MaxWidthWrapper>
  );
};

export default PrivacyPolicy; 