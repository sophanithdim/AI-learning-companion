
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {cn, getSubjectColor} from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface CompanionsListProps {
    title: string;
    companions?: Companion[];
    classNames?: string;
}

const CompanionsList = ({ title, companions, classNames }: CompanionsListProps) => {
    return (
        <article className={cn('companion-list animate-fade-in', classNames)}>
            <h2 className="font-bold text-3xl mb-6">{title}</h2>

            <Table>
                <TableHeader>
                    <TableRow className="border-b border-border/50">
                        <TableHead className="text-base font-medium text-muted-foreground w-2/3">Lessons</TableHead>
                        <TableHead className="text-base font-medium text-muted-foreground">Subject</TableHead>
                        <TableHead className="text-base font-medium text-muted-foreground text-right">Duration</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {companions?.map(({id, subject, name, topic, duration}, index) => (
                        <TableRow 
                            key={id} 
                            className="hover:bg-secondary/50 transition-colors duration-200 animate-slide-up hover-scale"
                            style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                        >
                            <TableCell className="py-4">
                                <Link href={`/companions/${id}`} className="block">
                                    <div className="flex items-center gap-4">
                                        <div className="size-[72px] flex items-center justify-center rounded-lg shadow-sm max-md:hidden bg-white">
                                            <Image
                                                src={`/icons/${subject}.svg`}
                                                alt={subject}
                                                width={35}
                                                height={35}
                                                loading="eager"
                                                className="opacity-80" 
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="font-semibold text-xl text-foreground">
                                                {name}
                                            </p>
                                            <p className="text-base text-muted-foreground">
                                                {topic}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <div className="subject-badge w-fit max-md:hidden">
                                    {subject}
                                </div>
                                <div className="flex items-center justify-center rounded-full w-fit p-2 md:hidden bg-primary/10">
                                    <Image
                                        src={`/icons/${subject}.svg`}
                                        alt={subject}
                                        width={18}
                                        height={18}
                                        loading="eager"
                                        className="opacity-80"
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 w-full justify-end">
                                    <p className="text-xl font-medium text-foreground">
                                        {duration} {' '}
                                        <span className="max-md:hidden text-muted-foreground text-base">mins</span>
                                    </p>
                                    <Image 
                                        src="/icons/clock-modern.svg" 
                                        alt="minutes" 
                                        width={14} 
                                        height={14} 
                                        className="md:hidden opacity-70" 
                                        loading="eager" 
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </article>
    )
}

export default CompanionsList;
