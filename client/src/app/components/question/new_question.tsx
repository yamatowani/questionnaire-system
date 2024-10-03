'use client';
import { useMutation } from "@apollo/client";
import { CREATE_QUESTION } from "@/lib/graphql/mutations/mutations";
import { NewQuestionInput } from "@/types/types";
import { useState } from "react";
import Link from "next/link";
