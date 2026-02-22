"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
	User,
	Mail,
	Phone,
	Home,
	Building2,
	Ruler,
	Calendar,
	MessageSquare,
	ChevronRight,
	ChevronLeft,
	Check,
	MapPin,
	Clock,
	Send,
	HardHat,
	DollarSign,
	AlertCircle,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface FormData {
	// Step 1: Service Type
	serviceType: string;
	propertyType: string;
	// Step 2: Project Details
	projectScope: string[];
	rooms: number;
	squareFootage: string;
	timeline: string;
	// Step 3: Contact Info
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	address: string;
	city: string;
	// Step 4: Additional Info
	budget: string;
	hearAboutUs: string;
	message: string;
	preferredContact: string;
	preferredTime: string;
}

const ContactWizard = () => {
	const { currentTheme } = useTheme();
	const [currentStep, setCurrentStep] = useState(1);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [submitError, setSubmitError] = useState("");
	const [referenceNumber, setReferenceNumber] = useState("");
	const formRef = useRef<HTMLDivElement>(null);
	const totalSteps = 4;

	const [formData, setFormData] = useState<FormData>({
		serviceType: "",
		propertyType: "",
		projectScope: [],
		rooms: 1,
		squareFootage: "",
		timeline: "",
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		address: "",
		city: "",
		budget: "",
		hearAboutUs: "",
		message: "",
		preferredContact: "",
		preferredTime: "",
	});

	const serviceTypes = [
		{ id: "diaphragm", label: "Diaphragm Wall", icon: Home },
		{ id: "topdown", label: "Top-Down Construction", icon: Building2 },
		{ id: "shoring", label: "Shoring & Piling", icon: Building2 },
		{ id: "anchoring", label: "Soil Anchoring", icon: Ruler },
	];

	const propertyTypes = [
		{ id: "commercial", label: "Commercial" },
		{ id: "metro", label: "Metro/DMRC" },
		{ id: "hospital", label: "Hospital" },
		{ id: "underpass", label: "Underpass" },
		{ id: "residential", label: "Residential Tower" },
		{ id: "other", label: "Other" },
	];

	const projectScopes = [
		"Diaphragm Wall",
		"Top-Down",
		"Shoring",
		"Piling",
		"Soil Anchoring",
		"Sheet Piling",
		"Micro Piling",
		"Vibrofloatation",
		"Excavation",
		"Retaining Wall",
	];

	const timelines = [
		{ id: "asap", label: "As soon as possible" },
		{ id: "2weeks", label: "Within 2 weeks" },
		{ id: "1month", label: "Within 1 month" },
		{ id: "3months", label: "Within 3 months" },
		{ id: "flexible", label: "Flexible" },
	];

	const budgets = [
		{ id: "under50l", label: "Under ₹50 Lakhs" },
		{ id: "50l-1cr", label: "₹50 Lakhs - ₹1 Crore" },
		{ id: "1cr-5cr", label: "₹1 Crore - ₹5 Crore" },
		{ id: "5cr-10cr", label: "₹5 Crore - ₹10 Crore" },
		{ id: "over10cr", label: "Over ₹10 Crore" },
		{ id: "unsure", label: "Not sure yet" },
	];

	const referralSources = [
		"Google Search",
		"Social Media",
		"Friend/Family",
		"Previous Customer",
		"Signage/Vehicle",
		"Industry Referral",
		"Other",
	];

	useEffect(() => {
		if (formRef.current) {
			gsap.fromTo(
				formRef.current.querySelector(".step-content"),
				{ opacity: 0, x: 20 },
				{ opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
			);
		}
	}, [currentStep]);

	const updateFormData = (
		field: keyof FormData,
		value: string | string[] | number,
	) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const toggleProjectScope = (scope: string) => {
		setFormData((prev) => ({
			...prev,
			projectScope: prev.projectScope.includes(scope)
				? prev.projectScope.filter((s) => s !== scope)
				: [...prev.projectScope, scope],
		}));
	};

	const nextStep = () => {
		if (currentStep < totalSteps) {
			setCurrentStep((prev) => prev + 1);
		}
	};

	const prevStep = () => {
		if (currentStep > 1) {
			setCurrentStep((prev) => prev - 1);
		}
	};

	const handleSubmit = async () => {
		setIsSubmitting(true);
		setSubmitError("");

		const refNumber = `#VI-${Date.now().toString().slice(-6)}`;
		setReferenceNumber(refNumber);

		try {
			const res = await fetch("/api/sendMail", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...formData,
					referenceNumber: refNumber,
				}),
			});

			const data = await res.json();

			if (!res.ok || !data.success) {
				throw new Error(data.message || "Failed to send enquiry");
			}

			setIsSubmitted(true);
		} catch (err: unknown) {
			const message =
				err instanceof Error
					? err.message
					: "Something went wrong. Please try again.";
			setSubmitError(message);
		} finally {
			setIsSubmitting(false);
		}
	};

	const isStepValid = () => {
		switch (currentStep) {
			case 1:
				return formData.serviceType && formData.propertyType;
			case 2:
				return formData.projectScope.length > 0 && formData.timeline;
			case 3:
				return formData.firstName && formData.email && formData.phone;
			case 4:
				return true;
			default:
				return false;
		}
	};

	const resetForm = () => {
		setIsSubmitted(false);
		setCurrentStep(1);
		setSubmitError("");
		setReferenceNumber("");
		setFormData({
			serviceType: "",
			propertyType: "",
			projectScope: [],
			rooms: 1,
			squareFootage: "",
			timeline: "",
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			address: "",
			city: "",
			budget: "",
			hearAboutUs: "",
			message: "",
			preferredContact: "",
			preferredTime: "",
		});
	};

	if (isSubmitted) {
		return (
			<div
				className="p-12 rounded-3xl text-center"
				style={{
					backgroundColor: currentTheme.colors.lightBg,
					border: `1px solid ${currentTheme.colors.border}`,
				}}>
				<div
					className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
					style={{ backgroundColor: `${currentTheme.colors.success}20` }}>
					<Check
						size={40}
						style={{ color: currentTheme.colors.success }}
					/>
				</div>
				<h3
					className="font-heading text-2xl font-bold mb-4"
					style={{ color: currentTheme.colors.heading }}>
					Thank You!
				</h3>
				<p
					className="font-body text-lg mb-2"
					style={{ color: currentTheme.colors.body }}>
					We&apos;ve received your enquiry and our engineering team will
					review it.
				</p>
				<p
					className="font-body text-base mb-6"
					style={{ color: currentTheme.colors.muted }}>
					A confirmation email has been sent to{" "}
					<strong style={{ color: currentTheme.colors.heading }}>
						{formData.email}
					</strong>
					. We will contact you as soon as possible — typically within 24
					hours.
				</p>
				<div
					className="p-4 rounded-xl mb-6"
					style={{ backgroundColor: currentTheme.colors.cardBg }}>
					<p
						className="font-body text-sm"
						style={{ color: currentTheme.colors.muted }}>
						Reference Number
					</p>
					<p
						className="font-heading text-xl font-semibold"
						style={{ color: currentTheme.colors.heading }}>
						{referenceNumber}
					</p>
				</div>
				<button
					onClick={resetForm}
					className="font-body font-semibold transition-colors duration-300"
					style={{ color: currentTheme.colors.secondary }}>
					Submit Another Request
				</button>
			</div>
		);
	}

	return (
		<div ref={formRef}>
			{/* Progress Bar */}
			<div className="mb-8">
				<div className="flex items-center justify-between mb-4">
					{[1, 2, 3, 4].map((step) => (
						<div key={step} className="flex items-center">
							<div
								className={`w-10 h-10 rounded-full flex items-center justify-center font-body font-semibold transition-all duration-300 ${
									step < currentStep
										? "bg-secondary text-cta-text"
										: step === currentStep
											? "bg-secondary text-cta-text scale-110"
											: "bg-card-bg text-muted"
								}`}
								style={{
									backgroundColor:
										step <= currentStep
											? currentTheme.colors.secondary
											: currentTheme.colors.cardBg,
									color:
										step <= currentStep
											? currentTheme.colors.ctaText
											: currentTheme.colors.muted,
								}}>
								{step < currentStep ? <Check size={18} /> : step}
							</div>
							{step < 4 && (
								<div
									className="w-full h-1 mx-2 rounded-full hidden sm:block"
									style={{
										backgroundColor:
											step < currentStep
												? currentTheme.colors.secondary
												: currentTheme.colors.border,
										width: "60px",
									}}
								/>
							)}
						</div>
					))}
				</div>
				<div
					className="flex justify-between text-xs font-body"
					style={{ color: currentTheme.colors.muted }}>
					<span>Service Type</span>
					<span>Project Details</span>
					<span>Contact Info</span>
					<span>Finish Up</span>
				</div>
			</div>

			{/* Form Content */}
			<div
				className="p-8 rounded-3xl"
				style={{
					backgroundColor: currentTheme.colors.lightBg,
					border: `1px solid ${currentTheme.colors.border}`,
				}}>
				<div className="step-content">
					{/* Step 1: Service Type */}
					{currentStep === 1 && (
						<div>
							<h3
								className="font-heading text-2xl font-bold mb-2"
								style={{ color: currentTheme.colors.heading }}>
								What service are you looking for?
							</h3>
							<p
								className="font-body text-sm mb-8"
								style={{ color: currentTheme.colors.muted }}>
								Select the type of construction service you need
							</p>

							<div className="grid grid-cols-2 gap-4 mb-8">
								{serviceTypes.map((service) => (
									<button
										key={service.id}
										onClick={() =>
											updateFormData("serviceType", service.id)
										}
										className={`p-6 rounded-2xl text-left transition-all duration-300 ${
											formData.serviceType === service.id
												? "scale-[1.02]"
												: "hover:scale-[1.01]"
										}`}
										style={{
											backgroundColor:
												formData.serviceType === service.id
													? `${currentTheme.colors.secondary}15`
													: currentTheme.colors.cardBg,
											border: `2px solid ${
												formData.serviceType === service.id
													? currentTheme.colors.secondary
													: currentTheme.colors.border
											}`,
										}}>
										<service.icon
											size={28}
											className="mb-3"
											style={{
												color:
													formData.serviceType === service.id
														? currentTheme.colors.secondary
														: currentTheme.colors.muted,
											}}
										/>
										<span
											className="font-body font-semibold block"
											style={{ color: currentTheme.colors.heading }}>
											{service.label}
										</span>
									</button>
								))}
							</div>

							<h4
								className="font-body font-semibold mb-4"
								style={{ color: currentTheme.colors.heading }}>
								What type of property?
							</h4>
							<div className="flex flex-wrap gap-3">
								{propertyTypes.map((type) => (
									<button
										key={type.id}
										onClick={() =>
											updateFormData("propertyType", type.id)
										}
										className="px-5 py-2.5 rounded-full font-body text-sm font-medium transition-all duration-300"
										style={{
											backgroundColor:
												formData.propertyType === type.id
													? currentTheme.colors.secondary
													: "transparent",
											color:
												formData.propertyType === type.id
													? currentTheme.colors.ctaText
													: currentTheme.colors.body,
											border: `2px solid ${
												formData.propertyType === type.id
													? currentTheme.colors.secondary
													: currentTheme.colors.border
											}`,
										}}>
										{type.label}
									</button>
								))}
							</div>
						</div>
					)}

					{/* Step 2: Project Details */}
					{currentStep === 2 && (
						<div>
							<h3
								className="font-heading text-2xl font-bold mb-2"
								style={{ color: currentTheme.colors.heading }}>
								Tell us about your project
							</h3>
							<p
								className="font-body text-sm mb-8"
								style={{ color: currentTheme.colors.muted }}>
								Select all areas for your project
							</p>

							<div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
								{projectScopes.map((scope) => (
									<button
										key={scope}
										onClick={() => toggleProjectScope(scope)}
										className="px-4 py-3 rounded-xl font-body text-sm font-medium transition-all duration-300 flex items-center gap-2"
										style={{
											backgroundColor:
												formData.projectScope.includes(scope)
													? `${currentTheme.colors.secondary}15`
													: currentTheme.colors.cardBg,
											color: formData.projectScope.includes(scope)
												? currentTheme.colors.secondary
												: currentTheme.colors.body,
											border: `2px solid ${
												formData.projectScope.includes(scope)
													? currentTheme.colors.secondary
													: currentTheme.colors.border
											}`,
										}}>
										{formData.projectScope.includes(scope) && (
											<Check size={16} />
										)}
										{scope}
									</button>
								))}
							</div>

							<div className="grid sm:grid-cols-2 gap-6 mb-8">
								<div>
									<label
										className="block font-body text-sm font-medium mb-2"
										style={{ color: currentTheme.colors.heading }}>
										Number of Basement Levels
									</label>
									<div className="flex items-center gap-4">
										<button
											onClick={() =>
												updateFormData(
													"rooms",
													Math.max(1, formData.rooms - 1),
												)
											}
											className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
											style={{
												backgroundColor: currentTheme.colors.cardBg,
												border: `1px solid ${currentTheme.colors.border}`,
											}}>
											-
										</button>
										<span
											className="font-heading text-2xl font-bold w-12 text-center"
											style={{ color: currentTheme.colors.heading }}>
											{formData.rooms}
										</span>
										<button
											onClick={() =>
												updateFormData("rooms", formData.rooms + 1)
											}
											className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
											style={{
												backgroundColor: currentTheme.colors.cardBg,
												border: `1px solid ${currentTheme.colors.border}`,
											}}>
											+
										</button>
									</div>
								</div>
								<div>
									<label
										className="block font-body text-sm font-medium mb-2"
										style={{ color: currentTheme.colors.heading }}>
										Approximate Area (sq ft)
									</label>
									<input
										type="text"
										value={formData.squareFootage}
										onChange={(e) =>
											updateFormData("squareFootage", e.target.value)
										}
										placeholder="e.g., 10,000 sq ft"
										className="w-full px-4 py-3 rounded-xl font-body text-sm transition-all duration-300 outline-none"
										style={{
											backgroundColor: currentTheme.colors.cardBg,
											border: `2px solid ${currentTheme.colors.border}`,
											color: currentTheme.colors.body,
										}}
									/>
								</div>
							</div>

							<h4
								className="font-body font-semibold mb-4"
								style={{ color: currentTheme.colors.heading }}>
								<Clock size={18} className="inline mr-2" />
								When do you need this done?
							</h4>
							<div className="flex flex-wrap gap-3">
								{timelines.map((timeline) => (
									<button
										key={timeline.id}
										onClick={() =>
											updateFormData("timeline", timeline.id)
										}
										className="px-5 py-2.5 rounded-full font-body text-sm font-medium transition-all duration-300"
										style={{
											backgroundColor:
												formData.timeline === timeline.id
													? currentTheme.colors.secondary
													: "transparent",
											color:
												formData.timeline === timeline.id
													? currentTheme.colors.ctaText
													: currentTheme.colors.body,
											border: `2px solid ${
												formData.timeline === timeline.id
													? currentTheme.colors.secondary
													: currentTheme.colors.border
											}`,
										}}>
										{timeline.label}
									</button>
								))}
							</div>
						</div>
					)}

					{/* Step 3: Contact Info */}
					{currentStep === 3 && (
						<div>
							<h3
								className="font-heading text-2xl font-bold mb-2"
								style={{ color: currentTheme.colors.heading }}>
								Your Contact Information
							</h3>
							<p
								className="font-body text-sm mb-8"
								style={{ color: currentTheme.colors.muted }}>
								We&apos;ll use this to send your personalized quote
							</p>

							<div className="grid sm:grid-cols-2 gap-6 mb-6">
								<div>
									<label
										className="block font-body text-sm font-medium mb-2"
										style={{ color: currentTheme.colors.heading }}>
										<User size={16} className="inline mr-2" />
										First Name *
									</label>
									<input
										type="text"
										value={formData.firstName}
										onChange={(e) =>
											updateFormData("firstName", e.target.value)
										}
										placeholder="Rajesh"
										className="w-full px-4 py-3 rounded-xl font-body text-sm transition-all duration-300 outline-none focus:ring-2"
										style={{
											backgroundColor: currentTheme.colors.cardBg,
											border: `2px solid ${currentTheme.colors.border}`,
											color: currentTheme.colors.body,
										}}
									/>
								</div>
								<div>
									<label
										className="block font-body text-sm font-medium mb-2"
										style={{ color: currentTheme.colors.heading }}>
										Last Name
									</label>
									<input
										type="text"
										value={formData.lastName}
										onChange={(e) =>
											updateFormData("lastName", e.target.value)
										}
										placeholder="Kumar"
										className="w-full px-4 py-3 rounded-xl font-body text-sm transition-all duration-300 outline-none"
										style={{
											backgroundColor: currentTheme.colors.cardBg,
											border: `2px solid ${currentTheme.colors.border}`,
											color: currentTheme.colors.body,
										}}
									/>
								</div>
							</div>

							<div className="grid sm:grid-cols-2 gap-6 mb-6">
								<div>
									<label
										className="block font-body text-sm font-medium mb-2"
										style={{ color: currentTheme.colors.heading }}>
										<Mail size={16} className="inline mr-2" />
										Email Address *
									</label>
									<input
										type="email"
										value={formData.email}
										onChange={(e) =>
											updateFormData("email", e.target.value)
										}
										placeholder="rajesh@example.com"
										className="w-full px-4 py-3 rounded-xl font-body text-sm transition-all duration-300 outline-none"
										style={{
											backgroundColor: currentTheme.colors.cardBg,
											border: `2px solid ${currentTheme.colors.border}`,
											color: currentTheme.colors.body,
										}}
									/>
								</div>
								<div>
									<label
										className="block font-body text-sm font-medium mb-2"
										style={{ color: currentTheme.colors.heading }}>
										<Phone size={16} className="inline mr-2" />
										Phone Number *
									</label>
									<input
										type="tel"
										value={formData.phone}
										onChange={(e) =>
											updateFormData("phone", e.target.value)
										}
										placeholder="+91 98765 43210"
										className="w-full px-4 py-3 rounded-xl font-body text-sm transition-all duration-300 outline-none"
										style={{
											backgroundColor: currentTheme.colors.cardBg,
											border: `2px solid ${currentTheme.colors.border}`,
											color: currentTheme.colors.body,
										}}
									/>
								</div>
							</div>

							<div className="grid sm:grid-cols-2 gap-6">
								<div>
									<label
										className="block font-body text-sm font-medium mb-2"
										style={{ color: currentTheme.colors.heading }}>
										<MapPin size={16} className="inline mr-2" />
										Project Site Address
									</label>
									<input
										type="text"
										value={formData.address}
										onChange={(e) =>
											updateFormData("address", e.target.value)
										}
										placeholder="Sector 62, Noida"
										className="w-full px-4 py-3 rounded-xl font-body text-sm transition-all duration-300 outline-none"
										style={{
											backgroundColor: currentTheme.colors.cardBg,
											border: `2px solid ${currentTheme.colors.border}`,
											color: currentTheme.colors.body,
										}}
									/>
								</div>
								<div>
									<label
										className="block font-body text-sm font-medium mb-2"
										style={{ color: currentTheme.colors.heading }}>
										City
									</label>
									<input
										type="text"
										value={formData.city}
										onChange={(e) =>
											updateFormData("city", e.target.value)
										}
										placeholder="Noida"
										className="w-full px-4 py-3 rounded-xl font-body text-sm transition-all duration-300 outline-none"
										style={{
											backgroundColor: currentTheme.colors.cardBg,
											border: `2px solid ${currentTheme.colors.border}`,
											color: currentTheme.colors.body,
										}}
									/>
								</div>
							</div>
						</div>
					)}

					{/* Step 4: Additional Info */}
					{currentStep === 4 && (
						<div>
							<h3
								className="font-heading text-2xl font-bold mb-2"
								style={{ color: currentTheme.colors.heading }}>
								Almost done!
							</h3>
							<p
								className="font-body text-sm mb-8"
								style={{ color: currentTheme.colors.muted }}>
								A few more details to help us prepare your quote
							</p>

							<div className="mb-6">
								<label
									className="block font-body text-sm font-medium mb-3"
									style={{ color: currentTheme.colors.heading }}>
									<DollarSign size={16} className="inline mr-2" />
									What&apos;s your budget range?
								</label>
								<div className="flex flex-wrap gap-3">
									{budgets.map((budget) => (
										<button
											key={budget.id}
											onClick={() =>
												updateFormData("budget", budget.id)
											}
											className="px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-300"
											style={{
												backgroundColor:
													formData.budget === budget.id
														? currentTheme.colors.secondary
														: "transparent",
												color:
													formData.budget === budget.id
														? currentTheme.colors.ctaText
														: currentTheme.colors.body,
												border: `2px solid ${
													formData.budget === budget.id
														? currentTheme.colors.secondary
														: currentTheme.colors.border
												}`,
											}}>
											{budget.label}
										</button>
									))}
								</div>
							</div>

							<div className="mb-6">
								<label
									className="block font-body text-sm font-medium mb-3"
									style={{ color: currentTheme.colors.heading }}>
									How did you hear about us?
								</label>
								<div className="flex flex-wrap gap-3">
									{referralSources.map((source) => (
										<button
											key={source}
											onClick={() =>
												updateFormData("hearAboutUs", source)
											}
											className="px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-300"
											style={{
												backgroundColor:
													formData.hearAboutUs === source
														? currentTheme.colors.secondary
														: "transparent",
												color:
													formData.hearAboutUs === source
														? currentTheme.colors.ctaText
														: currentTheme.colors.body,
												border: `2px solid ${
													formData.hearAboutUs === source
														? currentTheme.colors.secondary
														: currentTheme.colors.border
												}`,
											}}>
											{source}
										</button>
									))}
								</div>
							</div>

							<div>
								<label
									className="block font-body text-sm font-medium mb-2"
									style={{ color: currentTheme.colors.heading }}>
									<MessageSquare size={16} className="inline mr-2" />
									Additional Details or Questions
								</label>
								<textarea
									value={formData.message}
									onChange={(e) =>
										updateFormData("message", e.target.value)
									}
									placeholder="Tell us anything else about your project - soil conditions, depth requirements, site constraints..."
									rows={4}
									className="w-full px-4 py-3 rounded-xl font-body text-sm transition-all duration-300 outline-none resize-none"
									style={{
										backgroundColor: currentTheme.colors.cardBg,
										border: `2px solid ${currentTheme.colors.border}`,
										color: currentTheme.colors.body,
									}}
								/>
							</div>
						</div>
					)}
				</div>

				{/* Error Message */}
				{submitError && (
					<div
						className="flex items-center gap-3 mt-6 p-4 rounded-xl"
						style={{
							backgroundColor: `${currentTheme.colors.error}10`,
							border: `1px solid ${currentTheme.colors.error}30`,
						}}>
						<AlertCircle
							size={20}
							style={{ color: currentTheme.colors.error }}
						/>
						<p
							className="font-body text-sm"
							style={{ color: currentTheme.colors.error }}>
							{submitError}
						</p>
					</div>
				)}

				{/* Navigation */}
				<div
					className="flex justify-between items-center mt-8 pt-6 border-t"
					style={{ borderColor: currentTheme.colors.border }}>
					{currentStep > 1 ? (
						<button
							onClick={prevStep}
							className="flex items-center gap-2 px-6 py-3 rounded-xl font-body font-semibold transition-all duration-300"
							style={{
								color: currentTheme.colors.body,
								border: `2px solid ${currentTheme.colors.border}`,
							}}>
							<ChevronLeft size={18} />
							Back
						</button>
					) : (
						<div />
					)}

					{currentStep < totalSteps ? (
						<button
							onClick={nextStep}
							disabled={!isStepValid()}
							className="flex items-center gap-2 px-8 py-3 rounded-xl font-body font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
							style={{
								backgroundColor: currentTheme.colors.cta,
								color: currentTheme.colors.ctaText,
							}}>
							Continue
							<ChevronRight size={18} />
						</button>
					) : (
						<button
							onClick={handleSubmit}
							disabled={isSubmitting}
							className="flex items-center gap-2 px-8 py-3 rounded-xl font-body font-semibold transition-all duration-300 disabled:opacity-70"
							style={{
								backgroundColor: currentTheme.colors.cta,
								color: currentTheme.colors.ctaText,
							}}>
							{isSubmitting ? (
								<>
									<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
									Sending...
								</>
							) : (
								<>
									Submit Request
									<Send size={18} />
								</>
							)}
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default ContactWizard;
