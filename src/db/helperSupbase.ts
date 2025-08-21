import { supabase } from "./supabaseClient";

// Query condition classes
export class ConditionWhere {
    constructor(public column: string, public value: any) { }
}

export class ConditionSort {
    constructor(public column: string, public ascending: boolean = true) { }
}

export class ConditionPagination {
    constructor(public from: number, public to: number) { }
}

export class ConditionQuery {
    search?: ConditionWhere;
    isEqual: ConditionWhere[] = [];
    anyIn: ConditionWhere[] = [];
    isNotEqual: ConditionWhere[] = [];
    sort: ConditionSort[] = [];
    pagination?: ConditionPagination;

    constructor(init?: Partial<ConditionQuery>) {
        Object.assign(this, init);
    }
}

// Entity class for Supabase table operations
export class Entity {
    tableName: string;
    constructor(tableName: string) {
        this.tableName = tableName;
    }

    async select({
        condition,
        selects = "*",
    }: {
        condition?: ConditionQuery;
        selects?: string;
    }) {
        let query = supabase.from(this.tableName).select(selects);

        if (condition) {
            for (const eq of condition.isEqual) {
                if (eq.value !== undefined && eq.value !== null) {
                    query = query.eq(eq.column, eq.value);
                }
            }
            for (const neq of condition.isNotEqual) {
                if (neq.value !== undefined && neq.value !== null) {
                    query = query.neq(neq.column, neq.value);
                }
            }
            for (const anyIn of condition.anyIn) {
                if (anyIn.value && Array.isArray(anyIn.value) && anyIn.value.length > 0) {
                    query = query.in(anyIn.column, anyIn.value);
                }
            }
            if (
                condition.search &&
                typeof condition.search.value === "string" &&
                condition.search.value.trim() !== ""
            ) {
                query = query.ilike(
                    condition.search.column,
                    `%${condition.search.value.trim()}%`
                );
            }
            if (condition.sort.length > 0) {
                for (const sort of condition.sort) {
                    query = query.order(sort.column, { ascending: sort.ascending });
                }
            }
            if (condition.pagination) {
                query = query.range(condition.pagination.from, condition.pagination.to - 1);
            }
        }

        const { data, error } = await query;
        if (error) {
            return { status: false, message: error.message };
        }
        return { status: true, data };
    }

    async insert(data: any) {
        const { error } = await supabase.from(this.tableName).insert(data);
        if (error) return { status: false, message: error.message };
        return { status: true, message: "Data inserted successfully" };
    }

    async update(condition: ConditionWhere, data: any) {
        const { error } = await supabase
            .from(this.tableName)
            .update(data)
            .eq(condition.column, condition.value);
        if (error) return { status: false, message: error.message };
        return { status: true, message: "Data updated successfully" };
    }

    async delete(condition: ConditionWhere) {
        const { error } = await supabase
            .from(this.tableName)
            .delete()
            .eq(condition.column, condition.value);
        if (error) return { status: false, message: error.message };
        return { status: true, message: "Data deleted successfully" };
    }
}