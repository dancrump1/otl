import { Dispatch, SetStateAction } from "react";

import { SpecialsTypes } from "@shared/gql/entrytype.gql";
import { AnimatePresence, motion } from "motion/react";

import Action from "./_cmsBlocks/Action";
import { CopyText } from "./_cmsBlocks/content-blocks/CopyBlock";
import { CloseIcon } from "./CloseIcon";
import ImageComponent from "./Image";

const SpringModal = ({
	isOpen,
	setIsOpen,
	content,
}: {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	content: SpecialsTypes;
}) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={() => setIsOpen(false)}
					className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center cursor-pointer"
				>
					<motion.div
						initial={{ scale: 0, rotate: "12.5deg" }}
						animate={{ scale: 1, rotate: "0deg" }}
						exit={{ scale: 0, rotate: "0deg" }}
						onClick={(e) => e.stopPropagation()}
						className="bg-background-primary md:max-w-[75vw] cursor-default relative overflow-hidden"
					>
						<div className="relative z-10 flex">
							{!!content.images?.length && (
								<div className="hidden md:block overflow-hidden relative">
									<ImageComponent
										image={content.images[0]}
										priority
										loading="eager"
										className="max-w-none w-auto max-h-full"
										width="340"
										height="500"
									/>
								</div>
							)}
							<div className="py-2 px-8 md:py-6 xl:py-16 xl:px-12 basis-[600px]">
								<h2 className="text-tertiary">{content.title}</h2>
								<CopyText className="text-xs md:text-[16px]">
									{content.copy}
								</CopyText>
								{!!content.button?.length && (
									<Action
										button={content.button[0]}
										className="button primary mt-4"
									/>
								)}
							</div>
						</div>
						<button
							className="absolute top-4 right-4 z-10 cursor-pointer"
							onClick={() => setIsOpen(false)}
						>
							<CloseIcon />
						</button>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default SpringModal;
